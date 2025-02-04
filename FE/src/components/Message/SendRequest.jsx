import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useCreateRequestMutation } from '../../redux/api/chatrequest';
import { memberInfo } from '../../utils/auth';
import { Tooltip } from '@nextui-org/react';
import { useCreateNotificationMutation } from '../../redux/api/notificationApi';


export default function SendRequest({ memberId }) {
  const senderId = memberInfo().id;
  const [createRequest] = useCreateRequestMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const createNotification=useCreateNotificationMutation();

  const SubmitEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // const formData = new FormData();
      // formData.append('senderId', senderId);
      // formData.append('memberId', memberId);
      // formData.append('message', message);

      // Pass the FormData object directly to the mutation
      await createRequest({data:{
        "senderId": senderId,
        "memberId": memberId,
        "message": message,
      }});
      await createNotification({data:{
        "senderId":senderId,"recieverId":memberId,"type":"CHAT_REQUEST","content":"send a chat request","targetId":"1232"
      }}).unwrap()

      setMessage(''); // Reset message after successful submission
      onOpenChange(false); // Close the modal
    } catch (err) {
      setError('Failed to send the request. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Tooltip content="Send Request">
      <button
        className=" text-primary text-xl hover:bg-teal-50 hover:scale-105 rounded-full p-1"
        onClick={onOpen}
      >
        <MdPersonAddAlt1 className='hover:scale-105' />
      </button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="opaque"
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent className="bg-[#ffffff97] ">
          {(onClose) => (
            <>
              <ModalBody>
                <form onSubmit={SubmitEvent}>
                  <label>
                    Add Message
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-2 border-gray-300 p-2 rounded-md w-full"
                      placeholder="Write a message..."
                      disabled={isSubmitting}
                    />
                  </label>
                  <div className="mt-4">
                    <Button type="submit" isDisabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-500 mt-2">{error}</p>
                  )}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
