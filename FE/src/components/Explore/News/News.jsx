import React from 'react'
import NewsCompo from './NewsCompo'
import { useGetAllNewsQuery } from '../../../redux/api/newsApi';
export default function News() {
  const { data } = useGetAllNewsQuery();
  return (
    <>
      {data?data?.map((news)=><NewsCompo data={news}/>):<h1>No Data Found</h1>}
    </>
  )
}
