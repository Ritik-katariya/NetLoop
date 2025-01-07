import React from 'react';
import { Card } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const NoData = ({ size = "sm" }) => {
  // Size variants mapping
  const sizeMap = {
    sm: "w-24 h-24",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  return (
    <Card className="bg-transparent shadow-none flex items-center w-full h-full  justify-center">
      <div className={`relative ${sizeMap[size]}`}>
        {/* Large outer circle */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 rounded-full bg-cyan-400"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 30}deg) translate(120px) scale(${1 - index * 0.07})`,
                opacity: 1 - index * 0.07,
              }}
            />
          ))}
        </div>

        {/* Medium middle circle */}
        <div className="absolute inset-0 animate-[spin_2.5s_linear_infinite_reverse]">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 rounded-full bg-cyan-300"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 36}deg) translate(90px) scale(${1 - index * 0.08})`,
                opacity: 1 - index * 0.08,
              }}
            />
          ))}
        </div>

        {/* Small inner circle */}
        <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-cyan-200"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 45}deg) translate(60px) scale(${1 - index * 0.09})`,
                opacity: 1 - index * 0.09,
              }}
            />
          ))}
        </div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-cyan-500 rounded-full animate-pulse" />
      </div>

      {/* Optional loading text */}
      <p className="text-cyan-400 mt-24 text-3xl font-light animate-pulse  ">
       No Data
      </p>
      <Link to='/'>
      <p className="text-cyan-800 text-xl font-light animate-pulse  ">Go.. Home</p>
      </Link>
    </Card>
  );
};

export default NoData;