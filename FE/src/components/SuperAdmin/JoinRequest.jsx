import React from 'react';
import {
  Card,
  CardBody,
  Avatar,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Link
} from '@nextui-org/react';
import { FileText, Calendar, Network, CheckCircle, XCircle } from 'lucide-react';
import { useGetAllJoinRequestQuery,useDeleteJoinRequestMutation } from '../../redux/api/joinrequest';
import { useUpdateNetworkMemberMutation } from '../../redux/api/network';
const JoinRequestList = () => {
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
const {data:requests,refetch}=useGetAllJoinRequestQuery();
const [deleteJoinRequest]=useDeleteJoinRequestMutation();

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  const [updateNetworkMember]=useUpdateNetworkMemberMutation();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

 async function onAccept(request) {   
   console.log(request);
try {
  const memberId=request.memberId;
   const networkId=request.networkId;
  const requestId=request.id;
    await updateNetworkMember({memberId,networkId,data:{"requestId":requestId}}).unwrap();
  refetch();
  
} catch (error) {
    console.error(error);
}
    
  }
  const onDelete = async (id) => {  
    try {
        await deleteJoinRequest(id);
        onClose();
        console.log('Request deleted successfully');
        // You can add any additional logic here, such as updating the UI or showing a success message.
        } catch (error) {
            console.error('Error deleting request:', error);
            // Handle the error, such as showing an error message to the user.
            }
    };



  return (
    <div className="w-full space-y-4">
      {/* Request List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests&&requests?.map((request) => (
          <Card 
            key={request.id}
            className="border border-gray-200 hover:border-blue-200 transition-all duration-200 bg-white"
          >
            <CardBody className="p-4 bg-white">
              <div className="flex items-start gap-4">
                <Avatar
                  src={request.member?.profile?.img }
                  className="w-16 h-16 ring-2 ring-gray-100"
                  showFallback
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{request.member?.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip size="sm" color="primary" variant="flat">
                          {request.profession}
                        </Chip>
                        <span className="text-sm text-gray-500">
                          ID: {request.enrollmentNo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Accept Request">
                        <Button
                          isIconOnly
                          color="success"
                          variant="light"
                          size="sm"
                          onClick={() => onAccept(request)}
                        >
                          <CheckCircle size={20} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete Request">
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          size="sm"
                          onClick={() => onDelete(request.id)}
                        >
                          <XCircle size={20} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Network size={16} />
                      <span>{request.network?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      onClick={() => handleViewDetails(request)}
                    >
                      View Details
                    </Button>
                    <Tooltip content="View Document">
                      <Link href={request.document} target="_blank">
                        <Button
                          size="sm"
                          variant="flat"
                          color="secondary"
                        >
                          <FileText size={16} />
                          View Document
                        </Button>
                      </Link>
                    </Tooltip>
                  </div>
                </div>
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4 items-center bg-white">
                <Avatar
                  src={selectedRequest?.member?.profile?.img }
                  className="w-20 h-20"
                  showFallback
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedRequest?.member?.name}</h2>
                  <div className="flex gap-2 mt-1">
                    <Chip color="primary" variant="flat">
                      {selectedRequest?.profession}
                    </Chip>
                    <Chip variant="flat">
                      {selectedRequest?.enrollmentNo}
                    </Chip>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="p-6 bg-white">
                <div className="space-y-6">
                  {/* Network Information */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Network Information</h3>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <Network className="text-blue-500" size={24} />
                        <div>
                          <p className="font-medium">{selectedRequest?.network?.name}</p>
                          <p className="text-sm text-gray-500">Requested Network</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Request Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Request Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Profession</p>
                        <p className="font-medium">{selectedRequest?.profession}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Enrollment Number</p>
                        <p className="font-medium">{selectedRequest?.enrollmentNo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Request Date</p>
                        <p className="font-medium">{formatDate(selectedRequest?.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium">{formatDate(selectedRequest?.updatedAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Preview */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Document</h3>
                    <Link href={selectedRequest?.document} target="_blank">
                      <Button
                        color="secondary"
                        variant="flat"
                        startContent={<FileText size={18} />}
                      >
                        View Uploaded Document
                      </Button>
                    </Link>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="gap-2">
                <Button 
                  color="danger" 
                  variant="light"
                  onPress={() => {
                    onDelete(selectedRequest.id);
                    onClose();
                  }}
                  startContent={<XCircle size={18} />}
                >
                  Delete Request
                </Button>
                <Button 
                  color="success"
                  onPress={() => {
                    onAccept(selectedRequest.id);
                    onClose();
                  }}
                  startContent={<CheckCircle size={18} />}
                >
                  Accept Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JoinRequestList;