import React from 'react';
import { Card, Input, Avatar, Button } from "@nextui-org/react";
import { useGetNetworkQuery } from '../../redux/api/network';
import { useParams } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Search from '../Shared/Search/Search';
const NetworkProfile = () => {
  const {id}=useParams();
  const { data: networkData } = useGetNetworkQuery(id);

  // Dummy member data
  const members = Array(4).fill({
    name: "Ritik Kumar",
    department: "CSE",
    status: "Join Network"
  });

  // Dummy cluster images
  const clusters = Array(4).fill("/api/placeholder/100/100");

  return (
 <div className=' bg-gray-100'>
 <Header/>
 <div className="max-w-5xl mx-auto p-2 space-y-6 shadow-lg mt-5 bg-white rounded-md">
      {/* Header Section */}
      <div className="relative mb-36 ">
        <div className="h-72 w-full rounded-md overflow-hidden">
          <img 
            src={networkData?.cover}
            alt="Mountains"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 bg-[#ffffff] border-white shadow-xl">
            <img 
              src={networkData?.logo}
              alt="Logo" 
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      </div>

      {/* Institute Name */}
     <div className='h-44'>
     <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">{networkData?.name}</h1>
        <h2 className="text-2xl text-gray-600">{networkData?.address} { networkData?.pincode}</h2>
        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit esse, obcaecati est delectus officia veritatis soluta modi nemo amet, voluptates aut nihil quos repellat iure tempora nulla quidem natus iste?</h3>
      </div>
     </div>

      {/* Search and Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Left Column */}
        <div className="space-y-4 bg-gray-50 p-4  pt-6 w-full h-screen rounded-md shadow-lg">
          <Search />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Members</h3>
              <span className="text-gray-500">{networkData?.members?.length}</span>
            </div>
            
            <div className="space-y-3">
              {networkData?.members?.map((member, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar 
                      src="/api/placeholder/40/40"
                      size="md"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.status}</p>
                    </div>
                    {/* <span className="text-cyan-500">{member.department}</span> */}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6 bg-gray-50 rounded-lg shadow-lg w-full">
          {/* Clusters */}
         {!networkData?.clusters?.length>0&& <div className='bg-gray-400 h-36'> 
            <h3 className="text-xl font-semibold mb-4">Cluster</h3>
            <div className="grid grid-cols-6 gap-4">
              {[1,2,3,4,].map((cluster, index) => (
                <div key={index} className="rounded-full overflow-hidden">
                  <img 
                    src={networkData?.logo}
                    alt={`Cluster ${index + 1}`}
                    className="w-24 h-24 object-fill "
                  />
                </div>
              ))}
            </div>
          </div>}

                <div className='bg-gray-200 w-full grid grid-cols-1 md:grid-cols-2 '>
                <div></div>
                <div className='grid grid-rows-2'>
                  <span></span>
                  <span></span>
                </div>
                </div>

        </div>
         <div className='h-[1500px]'></div>

        
      </div>
    </div>
 </div>
  );
};

export default NetworkProfile;