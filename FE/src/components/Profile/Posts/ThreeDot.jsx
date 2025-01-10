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
import CreatePost from "./CreatePost";
import { useDeletePostMutation } from "../../../redux/api/post";
import { toast, ToastContainer } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
export default function OptionButton({id}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [deletePost] = useDeletePostMutation()
  const deleteHandler = async() => {
    if(!id)toast.error("Somthing is wrong");
  
    try {
      await deletePost(id);
      toast.success("Post deleted successfully")
    } catch (error) {
      toast.error("Post delete failed")
    }
  };
  return (
    <>
     <BsThreeDots onClick={onOpen} className="cursor-pointer text-lg hover:text-primary"/>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xs"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          
        }}
      >
        <ModalContent className="bg-[#ffffffbf] ">
          {(onClose) => (
            <><ToastContainer/>
              <ModalHeader className="flex flex-col gap-1 text-center w-full h-8 text-2xl text-gray-600 my-4">
                Post option
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full px-6 h-32 ">
                  <span><CreatePost id={id}/></span> 
                  <span onClick={()=>deleteHandler()} className="cursor-pointer font-semibold h-8 bg-teal-300  hover:bg-primary hover:text-white text-xl text-center mt-4 pt-1 flex justify-center items-center gap-3"> <MdDeleteOutline />Delete</span>
                </div>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
