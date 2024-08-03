// import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {

  const {loading, conversations} = useGetConversations();
  // console.log("CONVERSATIONS:", conversations);

  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {/* <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation /> */}

        {conversations.map((conversation,idx) =>
          <Conversation 
          // every conversation is unique and it send the objects conversation
            key={conversation._id}
            conversation={conversation}
            // emoji={getRandomEmoji}
            lastIdx={idx === conversations.length - 1}
          />
        )}

        {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
    </div>
  )
}

export default Conversations