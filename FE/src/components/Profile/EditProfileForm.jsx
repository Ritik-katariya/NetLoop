import {
  useUpdateProfileDetailsMutation,
  useGetDetailsQuery,
} from "../../redux/api/details";
import Header from "../Shared/Header/Header";
import {
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
  Chip,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Relationship Status Enum Options
const relationshipOptions = [
  { label: "Single", value: "SINGLE" },
  { label: "Married", value: "MARRIED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Complicated", value: "COMPLICATED" },
  { label: "Interested", value: "INTERESTED" },
  { label: "Not Interested", value: "NOTINTERESTED" },
];

export default function ProfileDetailsForm() {
  const { id } = useParams();
  const [updateProfileDetails] = useUpdateProfileDetailsMutation();
  const { data: detailsData } = useGetDetailsQuery(id);

  const [isLoading, setIsLoading] = useState(false);
  const [hobbyInput, setHobbyInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      overview: "",
      hobbie: [],
      interests: [],
      skills: [],
      facebook: "",
      instagram: "",
      linkedin: "",
      github: "",
      website: "",
      relationStatus: "",
    },
  });

  useEffect(() => {
    if (detailsData) {
      reset({
        overview: detailsData?.overview || "",
        hobbie: detailsData?.hobbie || [],
        interests: detailsData?.interests || [],
        skills: detailsData?.skills || [],
        facebook: detailsData?.facebook || "",
        instagram: detailsData?.instagram || "",
        linkedin: detailsData?.linkedin || "",
        github: detailsData?.github || "",
        website: detailsData?.website || "",
        relationStatus: detailsData?.relationStatus || "",
      });
    }
  }, [detailsData, reset]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await updateProfileDetails({ id, data }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = (field, value, setInput) => {
    if (value.trim()) {
      setValue(field, [...watch(field), value.trim()]);
      setInput("");
    }
  };

  const handleRemoveTag = (field, index) => {
    setValue(field, watch(field).filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header className="fixed top-0 w-full z-20" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl mx-auto space-y-6 p-6 bg-white mt-20 rounded-lg shadow-md mb-6"
      >
        <ToastContainer />

        {/* Basic Info */}
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">Basic Information</h2>
            <label className="block">
              <span className="text-gray-600">Overview</span>
              <Textarea
                placeholder="Write a brief overview"
                {...register("overview")}
                className="w-full mt-1"
              />
            </label>

            {/* Relationship Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship Status
              </label>
              <select
                {...register("relationStatus")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Select your relationship status</option>
                {relationshipOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#ffffffbb]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["facebook", "instagram", "linkedin", "github", "website"].map(
                (field) => (
                  <label key={field} className="block">
                    <span className="text-gray-600 capitalize">{field}</span>
                    <Input
                      {...register(field)}
                      placeholder={`Enter ${field} URL`}
                      className="mt-1"
                    />
                  </label>
                )
              )}
            </div>
          </CardBody>
        </Card>

        {/* Hobbies, Interests, Skills Section */}
        {["hobbie", "interests", "skills"].map((field, index) => (
          <Card key={index}>
            <CardBody className="space-y-4">
              <h2 className="text-xl font-bold capitalize">{field}</h2>
              <div className="flex flex-wrap gap-2">
                {watch(field)?.map((item, idx) => (
                  <Chip
                    key={idx}
                    onClose={() => handleRemoveTag(field, idx)}
                    variant="flat"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder={`Add ${field}`}
                  value={
                    field === "hobbie"
                      ? hobbyInput
                      : field === "interests"
                      ? interestInput
                      : skillInput
                  }
                  onChange={(e) =>
                    field === "hobbie"
                      ? setHobbyInput(e.target.value)
                      : field === "interests"
                      ? setInterestInput(e.target.value)
                      : setSkillInput(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleAddTag(
                      field,
                      field === "hobbie"
                        ? hobbyInput
                        : field === "interests"
                        ? interestInput
                        : skillInput,
                      field === "hobbie"
                        ? setHobbyInput
                        : field === "interests"
                        ? setInterestInput
                        : setSkillInput
                    )
                  }
                />
                <Button
                  onClick={() =>
                    handleAddTag(
                      field,
                      field === "hobbie"
                        ? hobbyInput
                        : field === "interests"
                        ? interestInput
                        : skillInput,
                      field === "hobbie"
                        ? setHobbyInput
                        : field === "interests"
                        ? setInterestInput
                        : setSkillInput
                    )
                  }
                >
                  Add
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button color="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Details"}
          </Button>
        </div>
      </form>
    </div>
  );
}
