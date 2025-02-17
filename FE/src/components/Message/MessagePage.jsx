import React from 'react'
import Message from './Message'
import Header from '../Shared/Header/Header'
import { SocketProvider } from '../../helpers/SocketContext'
export default function MessagePage() {
  return (
    <div>
      <Header chat={true}/>
      <SocketProvider>

      <Message/>
      </SocketProvider>
    </div>
  )
}
