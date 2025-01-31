import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { useGetNewsQuery } from "../../../redux/api/newsApi";
import { useUpdateNewsMutation } from "../../../redux/api/newsApi";
import { useCreateNewsMutation } from "../../../redux/api/newsApi";
import { memberInfo } from "../../../utils/auth";
import { useParams } from "react-router-dom";

const FormNews = ({ id }) => {
  const exploreId=useParams().id;
  const memberId = memberInfo().id;
  const { data } = useGetNewsQuery(id, { skip: !id });
  const [createNews, { isLoading: createLoading }] = useCreateNewsMutation();
  const [updateNews, { isLoading: updateLoading }] = useUpdateNewsMutation();
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      content: "",
      memberId: memberId,
      exploreId: "",
      title: "",
      author: ""
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        content: data.content,
        title: data.title,
        author: data.author,
        exploreId: data.exploreId
      });
      setFile(null);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const finalFormData = new FormData();
    finalFormData.append("content", formData.content);
    finalFormData.append("memberId", memberId);
    finalFormData.append("exploreId",exploreId);
    finalFormData.append("title", formData.title);
    finalFormData.append("author", formData.author);
    
    if (file) {
      finalFormData.append("file", file);
    }

    try {
      if (id) {
        await updateNews({ formData: finalFormData, id }).unwrap();
        toast.success("News updated successfully");
      } else {
        await createNews(finalFormData).unwrap();
        toast.success("News created successfully");
        reset();
        setFile(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center  h-full ">
      <Card className="w-full max-w-2xl">
        <CardBody>
          <ToastContainer />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <label >Title
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Title.."
                variant="bordered"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
              />
              </label>
              <label >Author
              <Input
                {...register("author", { required: "Author is required" })}
               placeholder="Author Name.."
                variant="bordered"
                isInvalid={!!errors.author}
                errorMessage={errors.author?.message}
              />
              </label>
            </div>

            <label className="block">
              <span className="sr-only">Choose Image File</span>
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

            <Textarea
              {...register("content", { required: "Content is required" })}
              label="Content"
              placeholder="Write your post content..."
              minRows={5}
              variant="bordered"
              isInvalid={!!errors.content}
              errorMessage={errors.content?.message}
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={createLoading || updateLoading}
              disabled={createLoading || updateLoading}
            >
              {id ? "Update News" : "Create News"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default FormNews;