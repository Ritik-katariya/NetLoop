import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { CiSaveUp2 } from "react-icons/ci";
import { useCreateVerificationMutation } from "../../redux/api/Verification";
import { memberInfo } from "../../utils/auth";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const VerificationForm = () => {
    const navigate=useNavigate()
  const memberId = memberInfo().id;
  const [createVerification,{isLoading,isSuccess}] = useCreateVerificationMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      adharno: "",
      adharimg: null,
      realphoto: null
    }
  });

  const onSubmit = async (data) => {
    const formDataToSend = new FormData();

    formDataToSend.append("adharno", data.adharno || "");
   
    formDataToSend.append("memberId", memberId || "");

    if (data.adharimg) formDataToSend.append("adharimg", data.adharimg);
    if (data.realphoto) formDataToSend.append("realphoto", data.realphoto);

    try {
      const response = await createVerification(formDataToSend).unwrap();
      console.log("Verification created successfully:", response);
      toast.success("Verification created successfully!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Failed to create verification:", error);
      toast.error("Failed to create verification. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-col gap-2">
        <h4 className="text-xl font-bold">Verification Form</h4>
      </CardHeader>
      <ToastContainer/>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Aadhar Section */}
          <div className="space-y-4">
            <h5 className="font-semibold">Aadhar Details</h5>
            <Controller
              name="adharno"
              control={control}
              rules={{ 
                required: "Aadhar number is required",
                pattern: {
                  value: /^\d{12}$/,
                  message: "Aadhar number must be 12 digits"
                }
              }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Aadhar Number
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter your 12-digit Aadhar number"
                      variant="bordered"
                      className="w-full mt-1"
                    />
                  </label>
                  {errors.adharno && (
                    <span className="text-red-500 text-sm">{errors.adharno.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              name="adharimg"
              control={control}
              rules={{ required: "Aadhar card image is required" }}
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <div>
                  <label className="block text-sm font-medium">
                    Aadhar Card Image
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-cyan-50 file:text-primary
                        hover:file:bg-cyan-100
                        mt-1"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files[0])}
                    />
                  </label>
                  {errors.adharimg && (
                    <span className="text-red-500 text-sm">{errors.adharimg.message}</span>
                  )}
                </div>
              )}
            />
          </div>

        

          {/* Photo Section */}
          <div className="space-y-4">
            <h5 className="font-semibold">Your Photo</h5>
            <Controller
              name="realphoto"
              control={control}
              rules={{ required: "Your photo is required" }}
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <div>
                  <label className="block text-sm font-medium">
                    Profile Photo
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-cyan-50 file:text-primary
                        hover:file:bg-cyan-100
                        mt-1"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files[0])}
                    />
                  </label>
                  {errors.realphoto && (
                    <span className="text-red-500 text-sm">{errors.realphoto.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            disabled={isLoading||isSuccess}
            endContent={<CiSaveUp2 />}
          >
            {isLoading?"Loading..":"Submit Verification"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default VerificationForm;