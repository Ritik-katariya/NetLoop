import React from 'react'
import NewsCompo from './NewsCompo'
import { useGetAllNewsQuery } from '../../../redux/api/newsApi';
import NoData from '../../Shared/NoData';
export default function News() {
  const { data } = useGetAllNewsQuery();
   if(data?.length===0)return (
      <div className="flex justify-center items-center  w-full mt-8 p-6 ">
        <NoData size='md' />
      </div>
    );
  return (
    <>
      {data?data?.map((news)=><NewsCompo data={news}/>):<h1>No Data Found</h1>}
    </>
  )
}
