import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetExploreQuery } from '../../../redux/api/Explore';
import NewsCompo from '../News/NewsCompo';
import RatingInputForm from '../Openion/RatingInputForm';
import Poll from '../Openion/Poll';
import { PromotionCard } from '../Promotion/PromotionCard';
import NoData from '../../Shared/NoData';

export default function ExploreAll() {
  const { memberData } = useSelector((state) => state.member);
  const [exploreId, setExploreId] = useState('');
  const [exploreData, setExploreData] = useState([]);

  const { data, isLoading, isSuccess, error } = useGetExploreQuery(exploreId);

 
  useEffect(() => {
    if (memberData) {
      setExploreId(memberData?.networks[0]?.explore?.id || '');
    }
  }, [memberData]);

  if(data?.length===0)return (
    <div className="flex justify-center items-center  w-full mt-8 p-6 ">
      <NoData size='md' />
    </div>
  );
  return (
    <div>
      {data?data.map((item) =>{
        if(item?.type==="news")return <NewsCompo data={item?.data}/>
        if(item?.type==="poll")return <Poll data={item?.data}/>
        if(item?.type==="rating")return <RatingInputForm data={item?.data}/>
        if(item?.type==="promotion")return <PromotionCard promotion={item?.data}/>
      }):<div>No Data Found</div>}
    </div>
  );
}
