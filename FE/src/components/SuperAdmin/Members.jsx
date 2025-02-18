import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Avatar,
  Badge,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Divider
} from '@nextui-org/react';
import { Phone, Mail, Calendar, Network, Eye, Share2, MessageCircle, Heart } from 'lucide-react';
import { useGetMembersQuery } from '../../redux/api/member';
const MemberList = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
const { data:members }=useGetMembersQuery();
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    onOpen();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Member List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members?.data?.map((member) => (
          <Card 
            key={member.id}
            isPressable
            onPress={() => handleMemberClick(member)}
            className="border border-gray-200 hover:border-blue-200 transition-all duration-200"
          >
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <Avatar
                src={member.profile?.img}
                className="w-16 h-16 ring-2 ring-gray-100"
                showFallback
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <Badge 
                    color={member.status ? "success" : "default"}
                    variant="flat"
                    className="ml-2"
                  >
                    {member.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {member.networks?.length || 0} Networks
                </p>
                {member.verified && (
                  <Chip 
                    color="primary" 
                    variant="flat" 
                    size="sm"
                    className="mt-2"
                  >
                    Verified
                  </Chip>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4 items-center bg-white">
                <Avatar
                  src={selectedMember?.profile?.img}
                  className="w-20 h-20"
                  showFallback
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedMember?.name}</h2>
                  <div className="flex gap-2 mt-1">
                    {selectedMember?.verified && (
                      <Chip color="primary" variant="flat">Verified</Chip>
                    )}
                    <Chip 
                      color={selectedMember?.status ? "success" : "default"}
                      variant="flat"
                    >
                      {selectedMember?.status ? "Active" : "Inactive"}
                    </Chip>
                  </div>
                </div>
              </ModalHeader>
              <Divider />
              <ModalBody className="p-6 bg-white">
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="text-gray-500" size={18} />
                        <span>{selectedMember?.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="text-gray-500" size={18} />
                        <span>{selectedMember?.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Network size={20} className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Networks</p>
                          <p className="text-lg font-semibold">{selectedMember?.networks?.length || 0}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Eye size={20} className="text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Views</p>
                          <p className="text-lg font-semibold">{selectedMember?.views?.length || 0}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Heart size={20} className="text-red-500" />
                        <div>
                          <p className="text-sm text-gray-500">Likes</p>
                          <p className="text-lg font-semibold">{selectedMember?.likes?.length || 0}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Share2 size={20} className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-500">Shares</p>
                          <p className="text-lg font-semibold">{selectedMember?.shares?.length || 0}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Activity */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Posts</span>
                        <span className="font-semibold">{selectedMember?.posts?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Comments</span>
                        <span className="font-semibold">{selectedMember?.comments?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Stories</span>
                        <span className="font-semibold">{selectedMember?.stories?.length || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>Joined {formatDate(selectedMember?.created_at)}</span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  variant="light" 
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MemberList;