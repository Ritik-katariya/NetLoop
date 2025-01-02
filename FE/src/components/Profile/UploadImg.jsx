import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiEditFill } from "react-icons/ri";
import { useUpdateProfileBannerMutation } from "../../redux/api/profile";

import { useEffect } from "react";
export default function UploadImg({ id, img, flag }) {
  const [file, setFile] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateProfileBanner, { isLoading }] = useUpdateProfileBannerMutation();
  // Moved outside
  // Moved outside
  useEffect(() => {
    setFile(img);
  }, [img]);
  const Uploadhandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("flag", flag);

      await updateProfileBanner({ formData, id }).unwrap();

      toast.success("Image uploaded successfully");
      setFile(null); // Clear the file input
      onOpenChange(false); // Close the modal
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Image upload error:", error);
    }
  };

  return (
    <>
      <RiEditFill
        onClick={onOpen}
        className="text-gray-700 hover:text-primary rounded-full bg-[#ffffff37] w-6 h-6 p-[5px]"
      />
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ToastContainer />
        <ModalContent className="bg-[#0000003f] ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary text-2xl font-mono font-semibold">
                {flag ? "Upload Banner" : "Upload Profile Picture"}
              </ModalHeader>
              <ModalBody>
                <Image alt="Cover Image" src={img} width={300} />
                <form
                  className="flex items-center space-x-6"
                  onSubmit={Uploadhandler}
                >
                  <div className="shrink-0">
                    {file && file instanceof Blob && (
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={URL.createObjectURL(file)}
                        alt="current photo"
                      />
                    )}
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])} // Correct file handling
                      className="block w-full text-sm text-gray-300
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-cyan-50 file:text-primary
                          hover:file:bg-cyan-100"
                    />
                  </label>

                  <div>
                    <Button
                      color="primary"
                      type="submit"
                      className="rounded-lg text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading.." : "Upload"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
