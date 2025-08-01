import React from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { MdModeEditOutline  } from "react-icons/md";


  
  export default function Modalapp() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button className="bg-primary rounded-lg h-8 text-white text-base cursor-pointer" onPress={onOpen} ><MdModeEditOutline/> Details</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='md' backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}>
          <ModalContent className='bg-[#ffffff97] ' >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                   
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
