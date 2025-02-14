import React from 'react'
import NetworkProfile from './Network'
import Search from '../../Shared/Search/Search'
import { useSelector } from 'react-redux'

export default function NetworkProfilePage() {
  const {memberData}=useSelector(state=>state.member);
  const networks=memberData?.networks||[];
  return (
    <div className='flex flex-col gap-4'>
        {/* <Search/> */}
     
      {networks.map(network=>(
        <NetworkProfile network={network}/>
      ))}
    </div>
  )
}
