import React from 'react'
import NewsCompo from './NewsCompo'

export default function News() {
  return (
    <>
      {[1,2,3,4].map(()=><NewsCompo/>)}
    </>
  )
}
