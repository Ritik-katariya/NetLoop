import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import io from 'socket.io-client';

const NOTIFICATION_URL = "/notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create notification
    createNotification: build.mutation({
      query: (data) => ({
        url: `${NOTIFICATION_URL}/create`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.notification]
    }),

    // Get notifications for a member
    getNotifications: build.query({
      query: ({ memberId, page = 1, limit = 20 }) => ({
        url: `${NOTIFICATION_URL}/${memberId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.notification],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        try {
          await cacheDataLoaded;

          const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5050');

          socket.on("newNotification", (notification) => {
            updateCachedData((draft) => {
              if (!draft?.notifications) return;
              draft.notifications.unshift(notification);
              if (draft.meta) {
                draft.meta.total += 1;
                draft.meta.unreadCount += 1;
              }
            });
          });

          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          console.error('Socket error:', error);
        }
      }
    }),

    // Mark notification as read
    markAsRead: build.mutation({
      query: ({ notificationId, receiverId }) => ({
        url: `${NOTIFICATION_URL}/${notificationId}/read`,
        method: "PATCH",
        data: { receiverId }
      }),
      invalidatesTags: [tagTypes.notification]
    }),

    // Mark all notifications as read
    markAllAsRead: build.mutation({
      query: (receiverId) => ({
        url: `${NOTIFICATION_URL}/${receiverId}/read-all`,
        method: "PATCH"
      }),
      invalidatesTags: [tagTypes.notification]
    }),

    // Delete notification
    deleteNotification: build.mutation({
      query: ({ notificationId, receiverId }) => ({
        url: `${NOTIFICATION_URL}/${notificationId}`,
        method: "DELETE",
        data: { receiverId }
      }),
      invalidatesTags: [tagTypes.notification]
    })
  })
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation
} = notificationApi; 