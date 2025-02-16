import React from 'react'
import Poll from './Poll'
// Uncommented and assumed to exist
import RatingInputForm from './RatingInputForm'
import { useGetRatingByExploreQuery } from '../../../redux/api/rating'
import { useGetPollbyExploreIdQuery } from '../../../redux/api/poll'
import { useSelector } from 'react-redux'
import NoData from '../../Shared/NoData'

export default function Opinion() {
  const memberData = useSelector((state) => state.member?.memberData)
  const exploreId = memberData?.networks?.[0]?.explore?.id

  // Fetch data with skip option
  const { 
    data: ratingData, 
    isLoading: ratingLoading, 
    isError: ratingError 
  } = useGetRatingByExploreQuery(exploreId, { skip: !exploreId })

  const { 
    data: pollData, 
    isLoading: pollLoading, 
    isError: pollError 
  } = useGetPollbyExploreIdQuery(exploreId, { skip: !exploreId })

  // Loading and error states
  
  if (ratingError || pollError) return <div>Error loading data</div>
  if (!exploreId) return <div>No network found</div>

  // Combine data into a single array with type identifiers
  const combinedData = [
    ...(pollData?.map(item => ({ type: 'poll', data: item })) || []),
    ...(ratingData?.map(item => ({ type: 'rating', data: item })) || [])
  ]
 if(combinedData?.length===0||ratingLoading || pollLoading)return (
    <div className="flex justify-center items-center  w-full mt-8 p-6 ">
      <NoData size='md' />
    </div>
  );
  
  return (
    <div>
      {/* Render combined data */}
      {combinedData.map((item, index) => (
        <div key={index}>
          {item.type === 'poll' ? (
            <Poll data={item.data} />
          ) : (
            <RatingInputForm exploreId={exploreId} data={item.data} />
          )}
        </div>
      ))}
      
      {/* Rating input form at the bottom */}
      
    </div>
  )
}