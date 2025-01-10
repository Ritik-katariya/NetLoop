import React from 'react'
import NetworkProfile from './Network'
import Search from '../../Shared/Search/Search'

export default function NetworkProfilePage() {
  return (
    <div className='flex flex-col gap-4'>
        <Search/>
      <NetworkProfile/>
      <NetworkProfile/>
    </div>
  )
}
