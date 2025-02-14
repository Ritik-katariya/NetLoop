import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdAdd, MdOutlineTipsAndUpdates } from "react-icons/md";
import CreatePostForm from "./CreatePostForm";

export default function CreatePost({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {id === "" ? (
        <Button
          className="w-24 h-8 bg-gray-100 hover:bg-primary/90 text-gray-700 hover:text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
          onPress={onOpen}
        >
          <MdAdd size={18} /> Post
        </Button>
      ) : (
        <p
          className="w-full h-8 bg-teal-300 hover:bg-primary/90 text-gray-800 hover:text-white font-semibold rounded-sm text-center flex justify-center items-center gap-2 cursor-pointer transition-all duration-200"
          onClick={onOpen}
        >
          <MdOutlineTipsAndUpdates size={18} /> Update
        </p>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="opaque"
        placement="center"
        scrollBehavior="outlined"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-white shadow-lg rounded-lg p-4">
          <ModalBody>
            <CreatePostForm id={id} close={() => onOpenChange(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
