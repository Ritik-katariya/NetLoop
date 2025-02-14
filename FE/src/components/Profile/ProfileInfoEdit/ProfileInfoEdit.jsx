import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { MdModeEditOutline } from "react-icons/md";
import ProfileForm from "./ProfileForm";

export default function ProfileInfoEdit() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <MdModeEditOutline
        onClick={onOpen}
        className="cursor-pointer text-gray-600 hover:text-primary hover:scale-110 transition-all duration-200"
        size={22}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-white shadow-lg rounded-lg">
          {(onClose) => (
            <ModalBody className="p-6">
              <ProfileForm />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
