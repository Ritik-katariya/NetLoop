import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useUpdateProfileMutation, useGetProfileQuery } from "../../../redux/api/profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Not Disclosed", value: "notdisclosed" },
  { label: "Other", value: "other" },
];

const ProfileForm = () => {
  const { id } = useParams();
  const [updateProfile, { isSuccess, isError, isLoading }] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      bio: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      dob: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (data) {
      const { details, ...profileData } = data;
      reset(profileData);
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    if (data.pincode) data.pincode = parseInt(data.pincode);
    if (data.dob) data.dob = new Date(data.dob);

    await updateProfile({ id, data });

    if (isSuccess) {
      toast.success("Profile updated successfully");
    } else if (isError) {
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto  p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Profile Information</h2>

      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Bio */}
        <div>
          <label className="text-gray-700 font-medium">Bio</label>
          <Textarea {...register("bio")} placeholder="Tell us about yourself" className="w-full mt-1" />
        </div>

        {/* Address */}
        <div>
          <label className="text-gray-700 font-medium">Address</label>
          <Textarea {...register("address")} placeholder="Enter your address" className="w-full mt-1" />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">City</label>
            <Input {...register("city")} type="text" placeholder="Enter your city" className="w-full mt-1" />
          </div>
          <div>
            <label className="text-gray-700 font-medium">State</label>
            <Input {...register("state")} type="text" placeholder="Enter your state" className="w-full mt-1" />
          </div>
        </div>

        {/* Country & Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">Country</label>
            <Input {...register("country")} type="text" placeholder="Enter your country" className="w-full mt-1" />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Pincode</label>
            <Input
              {...register("pincode", {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit pincode",
                },
              })}
              type="text"
              placeholder="Enter your pincode"
              className="w-full mt-1"
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">Date of Birth</label>
            <Input {...register("dob")} type="date" className="w-full mt-1" />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Gender</label>
            <select {...register("gender")} className="w-full p-2 border rounded mt-1 bg-transparent">
              <option value="">Select your gender</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all duration-200 font-semibold rounded-lg py-3"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
