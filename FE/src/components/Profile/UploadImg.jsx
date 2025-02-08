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
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiEditFill } from "react-icons/ri";
import { useUpdateProfileBannerMutation } from "../../redux/api/profile";
import { MdOutlineFileUpload } from "react-icons/md";

export default function UploadImg({ id, img, flag }) {
  const [file, setFile] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateProfileBanner, { isLoading }] = useUpdateProfileBannerMutation();

  useEffect(() => {
    setFile(img);
  }, [img]);

  const Uploadhandler = async (e) => {
    e.preventDefault();
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
      setFile(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Image upload error:", error);
    }
  };

  return (
    <>
      <RiEditFill
        onClick={onOpen}
        className="text-gray-700 hover:text-primary bg-white p-1 w-7 h-7 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
      />
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ToastContainer />
        <ModalContent className="bg-[#181b1be6] text-white shadow-xl rounded-lg">
          {(onClose) => (
            <>
              <ModalHeader className="text-primary text-xl font-semibold">
                {flag ? "Upload Banner" : "Upload Profile Picture"}
              </ModalHeader>
              <ModalBody className="flex flex-col items-center gap-4">
                {/* Current Image Preview */}
                <div className="w-full flex justify-center">
                  <Image
                    alt="Cover Image"
                    src={img || "https://via.placeholder.com/400"}
                    width={300}
                    className="rounded-md shadow-md"
                  />
                </div>

                {/* Upload Form */}
                <form className="flex flex-col items-center gap-4 w-full" onSubmit={Uploadhandler}>
                  <div className="w-24 h-24 relative">
                    {file && file instanceof Blob && (
                      <img
                        className="w-full h-full object-cover rounded-full shadow-md"
                        src={URL.createObjectURL(file)}
                        alt="Selected"
                      />
                    )}
                  </div>

                  {/* File Input */}
                  <label className="w-full flex flex-col items-center cursor-pointer">
                    <span className="text-gray-500 font-medium">Choose an image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                    />
                    <div className="mt-2 px-4 py-2 bg-teal-400 text-white rounded-md flex items-center gap-1 hover:bg-primary/90 transition-all cursor-pointer">
                     <MdOutlineFileUpload /> Select File
                    </div>
                  </label>

                  {/* Upload Button */}
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full text-white font-semibold rounded-md px-6 py-2 hover:scale-105 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Upload"}
                  </Button>
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
