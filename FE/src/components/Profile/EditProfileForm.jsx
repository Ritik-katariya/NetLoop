import React from "react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
  Chip,
  Divider,
} from "@nextui-org/react";
import Header from "../Shared/Header/Header";
import { useUpdateProfileDetailsMutation } from "../../redux/api/details";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ProfileDetailsForm() {
  const { id } = useParams();
  const [updateProfileDetails, { isLoading }] =
    useUpdateProfileDetailsMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      overview: "",
      hobbies: [],
      interests: [],
      skills: [],
      education: [{ degree: "", college: "", start_date: "" }],
      work: [
        {
          organization: "",
          position: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ],
    },
  });

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: workFields, append: appendWork } = useFieldArray({
    control,
    name: "work",
  });

  // Tag handling state and functions
  const [hobbyInput, setHobbyInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleAddTag = (field, value) => {
    if (value.trim()) {
      const currentValues = watch(field) || [];
      setValue(field, [...currentValues, value.trim()]);

      if (field === "hobbies") setHobbyInput("");
      if (field === "interests") setInterestInput("");
      if (field === "skills") setSkillInput("");
    }
  };

  const handleRemoveTag = (field, index) => {
    const currentValues = watch(field);
    setValue(
      field,
      currentValues.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    try {
      const response = await updateProfileDetails({ id, ...data }).unwrap();
      if (response.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-[20]">
        <Header />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl mx-auto space-y-6 p-4 bg-white mt-20 rounded-lg shadow-md mb-6"
      >
        <ToastContainer />
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">Basic Information</h2>

            <Textarea
              label="Overview"
              placeholder="Write a brief overview about yourself"
              {...register("overview")}
              className="w-full"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {watch("hobbies")?.map((hobby, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTag("hobbies", index)}
                    variant="flat"
                  >
                    {hobby}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a hobby"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddTag("hobbies", hobbyInput)
                  }
                />
                <Button onClick={() => handleAddTag("hobbies", hobbyInput)}>
                  Add
                </Button>
              </div>
            </div>

            {/* Similar structure for interests and skills sections */}
            {/* ... */}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Education</h2>
              <Button
                onClick={() =>
                  appendEducation({ degree: "", college: "", start_date: "" })
                }
              >
                Add Education
              </Button>
            </div>

            {educationFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                {index > 0 && <Divider />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label>
                    Degree
                    <Input
                      placeholder="Enter degree"
                      {...register(`education.${index}.degree`)}
                    />
                  </label>
                  <label>
                    College
                    <Input
                      placeholder="Enter college name"
                      {...register(`education.${index}.college`)}
                    />
                  </label>
                  <label>
                    Start Date
                    <Input
                      type="date"
                      {...register(`education.${index}.start_date`)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Work Experience</h2>
              <Button
                onClick={() =>
                  appendWork({
                    organization: "",
                    position: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                  })
                }
              >
                Add Work Experience
              </Button>
            </div>

            {workFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                {index > 0 && <Divider />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label>
                    Organization
                    <Input
                      placeholder="Enter organization name"
                      {...register(`work.${index}.organization`)}
                    />
                  </label>
                  <label>
                    Position
                    <Input
                      placeholder="Enter position"
                      {...register(`work.${index}.position`)}
                    />
                  </label>
                  <label>
                    Start Date
                    <Input
                      type="date"
                      {...register(`work.${index}.start_date`)}
                    />
                  </label>
                  <label>
                    End Date
                    <Input
                      type="date"
                      {...register(`work.${index}.end_date`)}
                    />
                  </label>
                  <Textarea
                    className="col-span-2"
                    label="Description"
                    placeholder="Enter job description"
                    {...register(`work.${index}.description`)}
                  />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <div className="flex justify-center items-center">
          <Button
            color="primary"
            type="submit"
            className="rounded-lg text-white hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Details"}
          </Button>
        </div>
      </form>
    </div>
  );
}
