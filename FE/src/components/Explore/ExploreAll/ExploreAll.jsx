import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetExploreQuery } from '../../../redux/api/Explore';
import NewsCompo from '../News/NewsCompo';
import RatingInputForm from '../Openion/RatingInputForm';
import Poll from '../Openion/Poll';
import { PromotionCard } from '../Promotion/PromotionCard';

export default function ExploreAll() {
  const { memberData } = useSelector((state) => state.member);
  const [exploreId, setExploreId] = useState('');
  const [exploreData, setExploreData] = useState([]);

  const { data, isLoading, isSuccess, error } = useGetExploreQuery(exploreId);

  // Set the exploreId based on memberData
  useEffect(() => {
    if (memberData) {
      setExploreId(memberData?.networks[0]?.explore?.id || '');
    }
  }, [memberData]);
console.log(data,"exdklf")
  // Process the data and set exploreData
  // useEffect(() => {
  //   if (exploreId && data) {
  //     const { news = [], events = [], promotion = [], opinion = [] } = data;

  //     // Combine all items into a single array, sorted by `createdAt`
  //     const combinedData = [...news, ...events, ...promotion, ...opinion]
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       .slice(0, 10); // Limit to 10 items

  //     setExploreData(combinedData);
  //   }
  // }, [data, exploreId]);

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
