import React, { useState } from "react";
import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";
import { Upload, Link, FileText } from "lucide-react";
import { useCreateRatingMutation } from "../../../redux/api/rating";
import { toast, ToastContainer } from "react-toastify";
import { memberInfo } from "../../../utils/auth";
import { useParams } from "react-router-dom";
const RatingCreateForm = () => {
  const memberId = memberInfo().id;
  const exploreId = useParams().id;
  const [createRatingMutation, { isError,isSuccess }] = useCreateRatingMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    linkUrl: "",
    memberId:memberId,
    exploreId:exploreId
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file || null,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await createRatingMutation(formData);
      
     toast.success("Rating created successfully!");
   
     
    } catch (error) {
      console.error("Failed to create rating:", error);
      toast.error("Failed to create rating. Please try again.");
      
    }
   
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Card className="w-full ">
        <CardBody>
          <ToastContainer/>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Rating Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label>
              Title
              <Input
                startContent={<FileText />}
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                variant="bordered"
              />
            </label>
            <label>
              Description
              <Input
                startContent={<FileText />}
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                variant="bordered"
              />
            </label>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Upload Image
              </label>
              <div className="flex items-center space-x-4 ">
                <Input
                  type="file"
                  startContent={<Upload />}
                  onChange={handleFileChange}
                  accept="image/*"
                  variant="bordered"
                />
                {formData.imageFile && (
                  <Image
                    src={formData.imageFile}
                    alt="Uploaded"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                )}
              </div>
            </div>

            <label className="mt-3">
              URL Link
              <Input
                startContent={<Link />}
                placeholder="Enter URL"
                value={formData.linkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkUrl: e.target.value })
                }
                variant="bordered"
              />
            </label>

            <Button color="primary" type="submit" fullWidth className="mt-4">
         {     "Submit Rating"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RatingCreateForm;
