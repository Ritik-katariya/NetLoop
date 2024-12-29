import React, { useState } from "react";
import { Card, Button, Modal } from "@nextui-org/react";
import NetworkProfileImg from "./NetworkProfileImg";

const NetworkProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://nextui.org/images/hero-card-complete.jpeg",
    "https://nextui.org/images/hero-card-complete.jpeg",
    "https://nextui.org/images/hero-card-complete.jpeg",
    "https://nextui.org/images/hero-card-complete.jpeg",
    "https://nextui.org/images/hero-card-complete.jpeg",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-2 bg-white rounded-xl shadow-lg">
      {/* Header Card */}
      <Card className="w-full ">
        <div className="flex flex-col md:flex-row gap-6 p-4">
          {/* Institute Image */}
          <div className="w-full md:w-1/3">
            <img
              src="https://nextui.org/images/hero-card-complete.jpeg"
              alt="Institute"
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>

          {/* Institute Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                National Institute of Technology Agartala
              </h1>
              <p className="text-gray-600">
                NIT Agartala, Barjala, Jirania, Agartala, Tripura 799046
              </p>

              <div className="grid grid-cols-3 gap-8 mt-6">
                <div>
                  <p className="font-semibold text-gray-600">Total Member:</p>
                  <p className="text-xl mt-1">530.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Total Cluster:</p>
                  <p className="text-xl mt-1">30.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Follower:</p>
                  <p className="text-xl mt-1">800.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
            <Button className="bg-cyan-400 text-white w-40 h-10 rounded-lg mr-14" >
            Exit Network
          </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Section */}
      <div className="relative w-full min-h-[240px] flex  justify-center items-center pb-2">
        {/* Image Gallery */}
        <div className="relative w-[55%] h-[240px]">
          {/* Image Grid with Consistent Sizes */}
          <div
            onClick={() => setSelectedImage(images[0])}
            className="absolute left-0 top-0 w-36 h-36 z-50 cursor-pointer hover:z-50"
            style={{ transform: "translate(10%, 10%)" }}
          >
            <NetworkProfileImg />
          </div>

          <div
            onClick={() => setSelectedImage(images[1])}
            className="absolute left-24 top-16 w-36 h-36 cursor-pointer hover:z-50"
            style={{ transform: "translate(20%, 10%)" }}
          >
            <NetworkProfileImg />
          </div>

          <div
            onClick={() => setSelectedImage(images[2])}
            className="absolute left-52 top-0 w-36 h-36 z-30 cursor-pointer hover:z-50"
            style={{ transform: "translate(30%, 20%)" }}
          >
            <NetworkProfileImg />
          </div>

          <div
            onClick={() => setSelectedImage(images[3])}
            className="absolute left-[340px] top-20 w-36 h-36 z-20 cursor-pointer hover:z-50"
            style={{ transform: "translate(20%, 10%)" }}
          >
            <NetworkProfileImg />
          </div>

          
        </div>

        {/* Memories Section */}
        <div className="w-[45%] ml-44 text-right flex justify-center flex-col  items-center">
          <h2 className="text-xl font-bold mb-6 text-center ">All Memories of a year</h2>
          <Button className="bg-cyan-400 text-white w-40 h-10 rounded-lg" >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkProfile;
