import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdModeEditOutline } from "react-icons/md";

export default function NetworkProfileImg() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <img
        onClick={onOpen}
        src={`https://nextui.org/images/hero-card-complete.jpeg`}
        alt={`gallery-${"helo"}`}
        className="w-full h-full object-cover"
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-[#ffffff97] ">
          {(onClose) => (
            <>

              <ModalBody>
                <img
                  
                  src={`https://nextui.org/images/hero-card-complete.jpeg`}
                  alt={`gallery-${"helo"}`}
                  className="w-full h-full object-cover-cover "
                />
              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
