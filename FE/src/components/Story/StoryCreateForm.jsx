import { useCreateStoryMutation } from "../../redux/api/storyApi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Camera, Video, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { MdAdd  } from "react-icons/md";

const StoryModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [Vid, setVid] = useState(true);
  const [Img, setImg] = useState(true);
  const [createStory, { isLoading }] = useCreateStoryMutation();
  const memberData = useSelector((state) => state.member?.memberData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      networkId: "",
      image: null,
      video: null,
      memberId: "",
    },
  });

  useEffect(() => {
    if (memberData?.id) {
      setValue("memberId", memberData.id);
    }
  }, [memberData, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setVideoPreview(null);
      setValue("video", null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setValue("image", file);
      setImg(true);
      setVid(true);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a video file");
        e.target.value = null;
        return;
      }

      // Check video duration
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 15) {
          toast.error("Video must be 15 seconds or less");
          setVideoPreview(null);
          setValue("video", null);
          e.target.value = null;
          return;
        }

        // If duration is valid, proceed with preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setValue("video", file);
        setVid(true);
        setImg(true);
      };

      video.src = URL.createObjectURL(file);
    }
  };

  const validateFile = (file) => {
    if (file.type.startsWith('video/')) {
      // Check video duration
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 15) {
            reject('Video must be 15 seconds or less');
          }
          resolve(true);
        };
        video.src = URL.createObjectURL(file);
      });
    }
    return Promise.resolve(true);
  };

  const submitForm = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("memberId", data.memberId);

      if (data.networkId) {
        formData.append("networkId", data.networkId);
      }

      if (data.image) {
        formData.append("file", data.image);
      } else if (data.video) {
        formData.append("file", data.video);
      }

      const response = await createStory({ formData });

      if (response.data) {
        toast.success("Story created successfully!");
        reset();
        setImagePreview(null);
        setVideoPreview(null);
        setImg(true);
        setVid(true);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Story creation error:", error);
      toast.error(error?.data?.message || "Failed to create story");
    }
  };

  return (
    <>
      <Button
        className="outline-dashed outline-2  rounded-lg h-8 text-black text-base mt-4 uppercase w-36 hover:bg-primary hover:text-white hover:outline-black hover:text-xl"
        onPress={onOpen}
      ><MdAdd />
         Add Story
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-[#ffffffed]">
          {(onClose) => (
            <form onSubmit={handleSubmit(submitForm)}>
              <ModalHeader className="flex flex-col gap-1">
                <ToastContainer />
                Create New Story
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <label>
                        Title
                        <Input
                          {...field}
                          placeholder="Enter your story title"
                          isRequired
                          isInvalid={!!errors.title}
                          errorMessage={errors.title?.message}
                        />
                      </label>
                    )}
                  />

                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: "Content is required" }}
                    render={({ field }) => (
                      <lable>
                        Content
                        <Textarea
                          {...field}
                          placeholder="Write your story here..."
                          minRows={4}
                          isRequired
                          isInvalid={!!errors.content}
                          errorMessage={errors.content?.message}
                        />
                      </lable>
                    )}
                  />

                  <Controller
                    name="networkId"
                    control={control}
                    render={({ field }) =>
                      memberData?.networks?.length > 0 && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Select Network
                          </label>
                          <select
                            {...field}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            <option value="">Select Network</option>
                            {memberData?.networks?.map((network) => (
                              <option key={network.id} value={network.id}>
                                {network.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {Img && (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          onClick={() => setVid(false)}
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
                        >
                          <Camera className="w-6 h-6 mr-2" />
                          <span>Add Image</span>
                        </label>
                        {imagePreview && (
                          <div className="relative mt-2">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setValue("image", null);
                              }}
                              className="absolute top-2 right-2 p-1 bg-danger rounded-full text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {Vid && (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="hidden"
                          id="video-upload"
                          onClick={() => setImg(false)}
                        />
                        <label
                          htmlFor="video-upload"
                          className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
                        >
                          <Video className="w-6 h-6 mr-2" />
                          <span>Add Video</span>
                        </label>
                        {videoPreview && (
                          <div className="relative mt-2">
                            <video
                              src={videoPreview}
                              className="w-full h-32 object-cover rounded-lg"
                              controls
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setVideoPreview(null);
                                setValue("video", null);
                              }}
                              className="absolute top-2 right-2 p-1 bg-danger rounded-full text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button color="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Posting..." : "Post Story"}
                </Button>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoryModal;
