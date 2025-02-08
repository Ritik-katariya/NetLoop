import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  Textarea,
  Button,
  Spinner,
} from "@nextui-org/react";
import AllNetwork from "./AllNetwork";
import { useCreatePostMutation, useUpdatePostMutation, useGetPostQuery } from "../../../redux/api/post";
import { ToastContainer, toast } from "react-toastify";

const CreatePostForm = ({ id, close }) => {
  const memberId = require("../../../utils/auth").memberInfo().id;
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: upIsLoading }] = useUpdatePostMutation();
  const { data, isLoading: getIsLoading } = useGetPostQuery(id);
  const [IdNet, setIdNet] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id && data) reset(data);
  }, [data, id]);

  function network(id) {
    setIdNet(id);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      description: "",
      memberId,
      networkId: IdNet,
      clusterId: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("memberId", data.memberId);
    formData.append("networkId", IdNet);
    formData.append("clusterId", "");
    formData.append("file", file);

    try {
      if (id) {
        await updatePost({ formData, id }).unwrap();
        toast.success("Post updated successfully");
      } else {
        await createPost(formData).unwrap();
        toast.success("Post created successfully");
        setTimeout(() => {
          close();
        }, 1000);
        reset();
      }
    } catch (error) {
      toast.error("Error saving post");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <ToastContainer />
      <Card className="w-full max-w-2xl ">
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Post Description */}
            <div>
              <Textarea
                label="Description"
                placeholder="Write your post description..."
                minRows={3}
                {...register("description")}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                className="w-full"
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Upload Image/Video</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 transition-all"
              />
              {file && (
                <div className="w-full flex justify-center mt-2">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="h-24 rounded-md object-cover" />
                </div>
              )}
            </div>

            {/* Network Selection */}
            <div className="flex gap-4">
              <AllNetwork network={network} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold rounded-lg hover:scale-105 transition-all duration-200"
              isDisabled={isLoading || upIsLoading}
            >
              {isLoading || upIsLoading ? <Spinner size="sm" color="white" /> : id ? "Update Post" : "Create Post"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePostForm;
