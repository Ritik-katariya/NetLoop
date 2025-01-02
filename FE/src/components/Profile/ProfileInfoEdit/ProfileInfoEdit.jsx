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
import ProfileForm from './ProfileForm';


  
  export default function ProfileInfoEdit() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <MdModeEditOutline  onClick={onOpen}  className='cursor-pointer hover:text-primary '/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='md' backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}>
          <ModalContent className='bg-[#ffffffe5] ' >
            {(onClose) => (
              <>
                
                <ModalBody>
                   <div>
                   <ProfileForm/>
                   </div>
                </ModalBody>
               
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
