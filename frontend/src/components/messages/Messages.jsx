// import React from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import Message from './Message'

const Messages = () => {

  const {messages, loading} = useGetMessages();
  console.log('messages:', messages)

  return (
    <div className='px-4 flex-1 overflow-auto'>
        {/* <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> */}

        {!loading && messages.length > 0 && messages.map((message) => <Message key={message._id} message={message}/>)}

        {/* load skeleton when load a user */}
        {loading && [...Array(1)].map((_, idx) => < MessageSkeleton key = {idx} />)}

        {/* show on top if no message */}
        {!loading && messages.length === 0 && (
            <p className='text-center'> start your conversation </p>
      )}

    </div>
  )
}

export default Messages