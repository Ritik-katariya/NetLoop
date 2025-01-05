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
      <Button
        className="bg-primary rounded-lg h-8 text-white text-base"
        onPress={onOpen}
      >
        <MdModeEditOutline /> Details
      </Button>
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
        <ModalContent className="bg-[#ffffff97] ">
          {(onClose) => (
            <><ToastContainer/>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <span><CreatePost id={id}/></span>
                  <span onClick={()=>deleteHandler()}>Delete</span>
                </div>
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
