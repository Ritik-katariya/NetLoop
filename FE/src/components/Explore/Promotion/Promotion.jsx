import React from 'react';
import { useGetPromotionByExploreQuery } from '../../../redux/api/promotion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PromotionCard } from './PromotionCard';
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

  if (isLoading) {
    return <div>Loading promotions...</div>;
  }

  if (error) {
    console.error('Error fetching promotions:', error);
    return <div>Error loading promotions.</div>;
  }

  

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
