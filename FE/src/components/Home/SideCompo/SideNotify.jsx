import React from "react";

export default function SideNotify() {
  return (
    <div className="w-[18%] mt-24 p-6 flex flex-col  bg-gray-50 rounded-md h-[650px] shadow-md border-[.5px]">
      <div>
        <h1 className="text-lg font-semibold mb-2">Recent join</h1>
        <span className="flex justify-between items-center ">
          <h3 className="text-gray-400">Network</h3>
          <h3 className="text-gray-400">2</h3>
        </span>
      </div>
      <div >
        <h1 className="text-lg font-semibold mb-2 mt-3">Recent join</h1>
        <span className="flex justify-between items-center ">
          <h3 className="text-gray-400">Network</h3>
          <h3 className="text-gray-400">2</h3>
        </span>
      </div>
    </div>
  );
}
