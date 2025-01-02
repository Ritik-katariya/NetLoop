import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useUpdateProfileMutation ,useGetProfileQuery } from "../../../redux/api/profile";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Notdisclosed", value: "notdisclosed" },
  { label: "Other", value: "other" },
];

const ProfileForm = () => {
  const {id} = useParams()
  const [updateProfile,{isSuccess,isError,isLoading}] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      // Extract profile-specific fields, excluding `details`
      const { details, ...profileData } = data;
  
      // Reset the form with only profile data
      reset(profileData);
    }
  }, [data, reset]);
  
  const onSubmit = async(data) => {
    // Convert pincode to integer
    if (data.pincode) {
      data.pincode = parseInt(data.pincode);
    }
    // Convert dob to DateTime
    if (data.dob) {
      data.dob = new Date(data.dob);
    }
  

    // Send patch request
    await updateProfile({ id, data });

    if (isSuccess) {
      toast.success("Profile updated successfully");
     
    } else if (isError) {
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 text-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             
       
        <div>
         <label >Bio
         <Textarea
            {...register("bio")}
            placeholder="Tell us about yourself"
            className="w-full"
          />
         </label>
        </div>

       
        <div>
          <label>Address
          <Textarea
            {...register("address")}
            placeholder="Enter your address"
            className="w-full"
          />
          </label>
        </div>


       <div className="grid md:grid-cols-2 gap-4">
       <div>
          <label>City
          <Input
            {...register("city")}
            type="text"
            placeholder="Enter your city"
            className="w-full"
          />
          </label>
        </div>
<ToastContainer/>
      
        <div>
          <label>State
          <Input
            {...register("state")}
            type="text"
            placeholder="Enter your state"
            className="w-full"
          />
          </label>
        </div>
       </div>

        
       <div className="grid md:grid-cols-2 gap-4">
       <div>
         <label>Country
         <Input
            {...register("country")}
            type="text"
            placeholder="Enter your country"
            className="w-full"
          />
         </label>
        </div>

      
        <div>
         <label>Pincode
         <Input
            {...register("pincode", {
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit pincode",
              },
            })}
            type="text"
            placeholder="Enter your pincode"
            className="w-full"
          />
         </label>
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pincode.message}
            </p>
          )}
        </div>
       </div>

    
       <div className="grid md:grid-cols-2 gap-4">
       <div>
          <label>Date of Birth
          <Input
            {...register("dob")}
            type="date"
            className="w-full"
          />
          </label>
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            {...register("gender")}
            className="w-full p-2 border rounded bg-transparent "
          >
            <option value="">Select your gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#ffffffbb]">
                {option.label}
              </option>
            ))}
          </select>
        </div>
       </div>

       
        <Button type="submit" variant="primary" className="w-full bg-primary hover:text-white hover:scale-105" disabled={isLoading||isSuccess}>
         { isLoading?"Loading..":"Save Profile"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
