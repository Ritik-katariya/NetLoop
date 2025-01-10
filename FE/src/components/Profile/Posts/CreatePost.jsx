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
import { MdAdd  } from "react-icons/md";
import CreatePostForm from './CreatePostForm';
import { MdOutlineTipsAndUpdates } from "react-icons/md";



  
  export default function CreatePost({id}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    
    return (
      <>
       {(id==='')?<Button  className="w-24 h-8 bg-gray-100  hover:bg-teal-300 focus:font-semibold focus:text-blu-950 rounded-lg " onPress={onOpen}> <MdAdd />Post</Button>:
       <p  className="w-full h-8   hover:bg-primary font-semibold bg-teal-300 hover:text-white rounded-sm  text-center pt-1  cursor-pointer flex justify-center text-xl items-center gap-3" onClick={onOpen}> <MdOutlineTipsAndUpdates />Update</p>}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg' backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          
        }}
      placement='center'
      scrollBehavior='outlined'
    >
          <ModalContent className='bg-[#ffffffe0] ' >
            {(onClose) => (
              <>
              
                <ModalBody>
                   <CreatePostForm id={id} close={() => onOpenChange(false)} />
                </ModalBody>
            
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
