import React from 'react'
import NetworkProfile from './Network'
import { useParams } from 'react-router-dom';
import { useGetMemberQuery } from '../../../redux/api/member';

export default function NetworkProfilePage() {
  const member = useParams();
  const{data:memberData,error:merror,isLoading:misLoading,isSuccess:misSuccess}=useGetMemberQuery(member?.id);
 
  const networks=memberData?.networks||[];
  return (
    <div className='flex flex-col gap-4'>
       
      {networks.map(network=>(
        <NetworkProfile network={network}/>
      ))}
    </div>
  )
}
