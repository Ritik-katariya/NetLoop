import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Avatar,
  Button,
} from "@nextui-org/react";
import { IoNotifications } from "react-icons/io5";
import { useGetNotificationsQuery, useMarkAllAsReadMutation } from '../../redux/api/notificationApi';
import { memberInfo } from '../../utils/auth';
import { format } from 'timeago.js';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export default function NotificationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const member = memberInfo();
  const memberId = member?.id;
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    { memberId, page, limit },
    { skip: !memberId }
  );

  const [markAllAsRead] = useMarkAllAsReadMutation();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(prev => 
        page === 1 
          ? notificationsData.notifications 
          : [...prev, ...notificationsData.notifications]
      );
      setUnreadCount(notificationsData.meta.unreadCount);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (!memberId) return;

    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5050', {
      query: { userId: memberId }
    });

    socket.on("newNotification", (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [memberId]);

  const handleMarkAllAsRead = async () => {
    if (!memberId) return;

    try {
      await markAllAsRead(memberId).unwrap();
      setUnreadCount(0);
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const loadMore = () => {
    if (notificationsData?.meta?.hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const getNotificationContent = (notification) => {
    switch (notification.type) {
      case 'LIKE':
        return `liked your ${notification.targetType.toLowerCase()}`;
      case 'COMMENT':
        return `commented on your ${notification.targetType.toLowerCase()}`;
      case 'CHAT_REQUEST':
        return 'sent you a chat request';
      case 'MESSAGE':
        return 'sent you a message';
      case 'FOLLOW':
        return 'started following you';
      default:
        return notification.content;
    }
  };

  // If user is not logged in, just show the icon without notifications
  if (!memberId) {
    return (
      <div className="relative">
        <IoNotifications className='text-2xl cursor-pointer' onClick={onOpen} />
      </div>
    );
  }


  return (
    <>
      <div className="relative">
        <IoNotifications className='text-2xl cursor-pointer' onClick={onOpen} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-teal-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>

      <Drawer 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        className="bg-white min-h-screen"
        placement="right"
        size="sm"
      >
        <DrawerContent>
          <DrawerHeader className="flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Button
                size="sm"
                color="primary"
                variant="light"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </DrawerHeader>
          
          <DrawerBody>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex justify-center items-center h-40 text-gray-500">
                No notifications yet
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Avatar
                      src={notification.sender?.profile?.img }
                      size="sm"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{notification.sender?.name}</span>{' '}
                        {getNotificationContent(notification)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}

                {notificationsData?.meta?.hasMore && (
                  <Button
                    size="sm"
                    variant="light"
                    className="w-full"
                    onClick={loadMore}
                  >
                    Load more
                  </Button>
                )}
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
  