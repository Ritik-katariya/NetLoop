import React from "react";
import { useGetNetworksQuery } from "../../redux/api/network";
import NetwrokCard from "./NetworkCompo";
import NoData from "../Shared/NoData";
import Header from "../Shared/Header/Header";

export default function Network() {
  const { data, isLoading, isSuccess, error } = useGetNetworksQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error: {error?.message || "An unexpected error occurred."}
        </p>
      </div>
    );

  if (!isSuccess || !Array.isArray(data) || data.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <NoData />
      </div>
    );

  return (
    <>
      <Header />
      <div className="px-4 md:px-8 py-6 md:min-h-screen mt-16">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 h-screen">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
             Networks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((network, index) => (
              <NetwrokCard key={index} value={network} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
