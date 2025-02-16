import React, { useState } from "react";
import { Card, Button } from "@nextui-org/react";
import NetworkProfileImg from "./NetworkProfileImg";
import { ToastContainer,toast } from "react-toastify";

const NetworkProfile = ({ network }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    about,
    address,
    city,
    country,
    cover,
    explore,
    followers,
    logo,
    name,
    pincode,
    socialmedia,
    state,
    website,
    id
  } = network;

  function exploreHandle(){
    toast.success("this feature upcoming in the future");
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <ToastContainer />
      {/* Header Card */}
      <Card className="w-full p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Institute Image */}
          <div className="w-full md:w-1/3">
            <img src={logo} alt="Institute" className="w-full h-[200px] object-fill rounded-lg" />
          </div>
          
          {/* Institute Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <p className="text-gray-600">{about}</p>
              <p className="text-gray-600 mt-2">{city}, {state}, {country}, {pincode}</p>
              <p className="text-gray-600">Website: <a href={website} target="_blank" className="text-blue-500">{website}</a></p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-6">
              <div>
                <p className="font-semibold text-gray-600">Total Members:</p>
                <p className="text-xl mt-1">{followers}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              {/* <Button className="bg-cyan-400 text-white w-40 h-10 rounded-lg mr-4">Exit Network</Button> */}
              <Button className="bg-blue-500 text-white w-40 h-10 rounded-lg" onClick={() => window.open(`../network/${id}`, '_blank')}>Visit</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Memories Section */}
      <div className="relative w-full min-h-[100px] flex justify-center items-center pb-2 mt-6">
        <div className="w-[45%] text-right flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">All Memories of the Year</h2>
          <Button className="bg-cyan-400 text-white w-40 h-10 rounded-lg" onClick={exploreHandle}>Explore</Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkProfile;
