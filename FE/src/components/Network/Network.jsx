import React from 'react'
import { useGetNetworksQuery } from '../../redux/api/network'
import NetwrokCard from './NetworkCompo';
import NoData from '../Shared/NoData';
import Header from '../Shared/Header/Header';
export default function Network() {
    const { data, isLoading, isSuccess, error } = useGetNetworksQuery();
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message || "An unexpected error occurred."}</div>;
    if (!isSuccess ||!Array.isArray(data)) return <div className='flex justify-center items-center w-full h-[700px]'><NoData/></div>;

  return (
     <>
      <Header/>
    <div className="md:min-h-screen px-8 py-2">
      <div className="max-w-4xl mx-auto  rounded-xl shadow-sm">
        
      <div className='grid grid-cols-3 p-4'>
      {data.map((network,index) =>(<NetwrokCard key={index} value={network} />))}
    </div>
      </div>
    </div>
    </>
  )
}
