import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Spinner,
} from "@nextui-org/react";
import AllNetwork from "./AllNetwork";
import { useCreatePostMutation } from "../../../redux/api/post";
import { ToastContainer, toast } from "react-toastify";
import { useUpdatePostMutation } from "../../../redux/api/post";
import { useGetPostQuery } from "../../../redux/api/post";
const CreatePostForm = ({ id, close }) => {
  const memberId = require("../../../utils/auth").memberInfo().id;
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: upIsLoading }] = useUpdatePostMutation();
  const { data, isLoading: getIsLoading } = useGetPostQuery(id);

  useEffect(() => {
    if (id) {
      reset(data);
    }
  }, [data, id]);
  const [setNetworkId] = useState("");
  const [IdNet, setIdNet] = useState("");
  function network(id) {
    setIdNet(id);
    
  }
  useEffect(() => {
  }, [IdNet]);

  const [File, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      description: "",
      memberId: memberId,
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
    formData.append("file", File);
    if (id) {
      try {
        await updatePost({ formData, id }).unwrap();
        toast.success("Post updated successfully");
      } catch (error) {
        toast.error("Error updating");
      }
    } else {
      try {
        await createPost(formData).unwrap();
        toast.success("Post created successfully");
        setTimeout(() => {
          close();
        }, 1000); // Navigate directly after showing the toast
        reset();
      } catch (error) {
        toast.error("Failed to create post");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[600px]  -mt-32">
      <Card className="w-full max-w-2xl">
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6  max-h-[600px]"
          >
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

            <div className="flex gap-4">
              <ToastContainer />
              <AllNetwork network={network} />
              {/* <div>
              <Input
                label="Cluster ID (Optional)"
                placeholder="Enter cluster ID"
                {...register('clusterId')}
                isInvalid={!!errors.clusterId}
                errorMessage={errors.clusterId?.message}
              />
            </div> */}
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Creating Post..." : "Create Post"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePostForm;
