import React from 'react';
import { useGetPromotionByExploreQuery } from '../../../redux/api/promotion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PromotionCard } from './PromotionCard';
import NoData from '../../Shared/NoData';
export default function Promotion() {
  const { memberData } = useSelector(state => state.member);
  const [exploreId, setExploreId] = useState("")
  useEffect(()=>{
    if(memberData){
      setExploreId( memberData?.networks[0]?.explore?.id);
    }
  },[memberData])

  const { data, isLoading, error } = useGetPromotionByExploreQuery(exploreId || '');

  if (!exploreId) {
    console.warn('Explore ID is undefined');
    return <div>Explore ID is not available.</div>;
  }

 

  if (error) {
    console.error('Error fetching promotions:', error);
    return <div>Error loading promotions.</div>;
  }
 if(data?.length===0||isLoading)return (
    <div className="flex justify-center items-center  w-full mt-8 p-6 ">
      <NoData size='md' />
    </div>
  );
  

  return (
    <div >
      {data ? (
       data.map(promotion=><PromotionCard promotion={promotion} key={promotion.id}/>)
      ) : (
        <div>No promotions available.</div>
      )}
    </div>
  );
}
