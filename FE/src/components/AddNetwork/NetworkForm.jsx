import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useCreateNetworkMutation } from "../../redux/api/network";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { memberInfo } from "../../utils/auth";
import 'react-toastify/dist/ReactToastify.css';
const NetworkCreateForm = () => {
  const memberId=memberInfo().id;
  const navigate = useNavigate();
  const [createNetwork, { isLoading, error,isSuccess }] = useCreateNetworkMutation();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: [],
      city: "",
      state: "",
      country: "",
      pincode: "",
      website: "",
      socialmedia: [],
      about: "",
      logo: null,
      cover: null,
    },
  });

  // Watch address and social media arrays
  const addresses = watch("address") || [];
  const socialMedia = watch("socialmedia") || [];

  // Handle new address input
  const [newAddress, setNewAddress] = React.useState("");
  const [newSocialMedia, setNewSocialMedia] = React.useState("");

  const addAddress = () => {
    if (newAddress.trim()) {
      setValue("address", [...addresses, newAddress.trim()]);
      setNewAddress("");
    }
  };

  const removeAddress = (index) => {
    setValue(
      "address",
      addresses.filter((_, i) => i !== index)
    );
  };

  const addSocialMedia = () => {
    if (newSocialMedia.trim()) {
      setValue("socialmedia", [...socialMedia, newSocialMedia.trim()]);
      setNewSocialMedia("");
    }
  };

  const removeSocialMedia = (index) => {
    setValue(
      "socialmedia",
      socialMedia.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append scalar fields
    Object.keys(data).forEach((key) => {
      if (key !== "logo" && key !== "cover" && !Array.isArray(data[key])) {
        formData.append(key, data[key]);
      }
    });
  
    // Append arrays
    if (Array.isArray(data.address)) {
      data.address.forEach((addr) => formData.append("address[]", addr));
    }
  
    if (Array.isArray(data.socialmedia)) {
      data.socialmedia.forEach((sm) => formData.append("socialmedia[]", sm));
    }
  
    // Append files
    if (data.logo) formData.append("logo", data.logo);
    if (data.cover) formData.append("cover", data.cover);
  
    formData.append("memberId", memberId);
    formData.append("followers",1);
  
    try {
      const result = await createNetwork(formData).unwrap();
      toast.success("Network created successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000); // Navigate directly after showing the toast
    } catch (err) {
      toast.error("Network creation failed");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      
      <CardHeader className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">Create Network</h2>
        <p className="text-gray-500">
          Fill in the details to create your network
        </p>
        <ToastContainer/>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg mb-4 font-semibold">Basic Information</h3>

            <Controller
              name="name"
              control={control}
              rules={{ required: "Network name is required" }}
              render={({ field }) => (
                <label>Network Name
                    <Input
                  {...field}
                  placeholder="Enter network name"
                  variant="bordered"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                />
                </label>
              )}
            />

            {/* Address Input with Chips */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="w-full">Address
                <Input
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                 
                  placeholder="Add an address"
                  variant="bordered"
                />
                </label>
                <Button onClick={addAddress} className="mt-5">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {addresses.map((addr, index) => (
                  <Chip
                    key={index}
                    onClose={() => removeAddress(index)}
                    variant="flat"
                  >
                    {addr}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                 <label>
                     City
                     <Input
                    {...field}
                   
                    placeholder="Enter city"
                    variant="bordered"
                    errorMessage={errors.city?.message}
                    isInvalid={!!errors.city}
                  />
                 </label>
                )}
              />

              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                 <label>State
                     <Input
                    {...field}
                    
                    placeholder="Enter state"
                    variant="bordered"
                    errorMessage={errors.state?.message}
                    isInvalid={!!errors.state}
                  />
                 </label>
                )}
              />

              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <label>
                    Country
                    <Input
                    {...field}
                   
                    placeholder="Enter country"
                    variant="bordered"
                    errorMessage={errors.country?.message}
                    isInvalid={!!errors.country}
                  />
                  </label>
                )}
              />

              <Controller
                name="pincode"
                control={control}
                rules={{ required: "Pincode is required" }}
                render={({ field }) => (
                  <label>
                    Pincode
                    <Input
                      {...field}
                      type="number"
                      
                      placeholder="Enter pincode"
                      variant="bordered"
                      errorMessage={errors.pincode?.message}
                      isInvalid={!!errors.pincode}
                    />
                  </label>
                )}
              />
            </div>
          </div>

          {/* Online Presence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Online Presence</h3>

            <Controller
              name="website"
              control={control}
              rules={{ required: "Website is required" }}
              render={({ field }) => (
                <label>
                  Website
                  <Input
                    {...field}
                    placeholder="Enter website URL"
                    variant="bordered"
                    errorMessage={errors.website?.message}
                    isInvalid={!!errors.website}
                  />
                </label>
              )}
            />

            {/* Social Media Links with Chips */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="w-full">
                  Social Media
                  <Input
                    value={newSocialMedia}
                    onChange={(e) => setNewSocialMedia(e.target.value)}
                    placeholder="Add social media link"
                    variant="bordered"
                  />
                </label>
                <Button onClick={addSocialMedia} className="mt-5">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {socialMedia.map((social, index) => (
                  <Chip
                    key={index}
                    onClose={() => removeSocialMedia(index)}
                    variant="flat"
                  >
                    {social}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          {/* About and Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About and Media</h3>

            <Controller
              name="about"
              control={control}
              rules={{ required: "About section is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Tell us about your network"
                  variant="bordered"
                  errorMessage={errors.about?.message}
                  isInvalid={!!errors.about}
                  minRows={3}
                />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="logo"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Logo Image
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
                        {...field}
                      />
                    </label>
                  </div>
                )}
              />

              <Controller
                name="cover"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Cover Image
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
                        {...field}
                      />
                    </label>
                  </div>
                )}
              />
            </div>
          </div>

          <Button type="submit" color="primary" className="w-full" size="lg" isDisabled={isLoading||isSuccess}>
           {isLoading?"Loading..":" Create Network"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default NetworkCreateForm;
