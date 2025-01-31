import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetExploreQuery } from '../../../redux/api/Explore';
import NewsCompo from '../News/NewsCompo';

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

  // Process the data and set exploreData
  useEffect(() => {
    if (exploreId && data) {
      const { news = [], events = [], promotion = [], opinion = [] } = data;

      // Combine all items into a single array, sorted by `createdAt`
      const combinedData = [...news, ...events, ...promotion, ...opinion]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10); // Limit to 10 items

      setExploreData(combinedData);
    }
  }, [data, exploreId]);
 console.log(exploreData, 'exploreData')
  return (
    <div>
      {exploreData?exploreData.map((item) =>{
        if(item?.category==="news")return <NewsCompo data={item}/>
        // if(item?.category==="news")return <NewsCompo data={item}/>
        // if(item?.category==="news")return <NewsCompo data={item}/>
        // if(item?.category==="news")return <NewsCompo data={item}/>
      }):<div>No Data Found</div>}
    </div>
  );
}
