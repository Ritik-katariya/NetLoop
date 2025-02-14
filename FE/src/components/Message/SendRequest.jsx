import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useCreateRequestMutation } from "../../redux/api/chatrequest";
import { memberInfo } from "../../utils/auth";
import { useCreateNotificationMutation } from "../../redux/api/notificationApi";

export default function SendRequest({ memberId }) {
  const senderId = memberInfo().id;
  const [createRequest] = useCreateRequestMutation();
  const [createNotification] = useCreateNotificationMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
console.log(memberId,"received request")
  const SubmitEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createRequest({
        data: {
          senderId: senderId,
          memberId: memberId,
          message: message,
        },
      });

      await createNotification({
        data: {
          senderId: senderId,
          receiverId: memberId,
          type: "CHAT_REQUEST",
          content: "sent a chat request",
        },
      }).unwrap();
      window.location.reload();
      setMessage(""); // Reset message after successful submission
      onOpenChange(false); // Close the modal
    } catch (err) {
      setError("Failed to send the request. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Tooltip for Request Button */}
      <Tooltip content="Send Request">
        <button
          className="text-gray-600 text-xl hover:bg-gray-200 rounded-full p-2 transition-all duration-150"
          onClick={onOpen}
        >
          <MdPersonAddAlt1 />
        </button>
      </Tooltip>

      {/* Request Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gray-300/50 backdrop-opacity-50",
        }}
      >
        <ModalContent className="bg-gray-100 shadow-md rounded-lg">
          {(onClose) => (
            <>
              <ModalBody className="p-6">
                <form onSubmit={SubmitEvent} className="space-y-4">
                  {/* Message Input */}
                  <label className="text-gray-700 text-sm font-medium">
                    Add Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-700"
                    placeholder="Write a message..."
                    disabled={isSubmitting}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      isDisabled={isSubmitting}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                  </div>

                  {/* Error Message */}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
