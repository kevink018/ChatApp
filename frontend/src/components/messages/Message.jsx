// import React from 'react'

import useConversation from "../../zustand/useConversation";
import {useAuthContext} from '../../context/AuthContext'

const Message = ({message}) => {

    const {authUser}= useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    //make from me and from another user with different message color
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';

  return (
    // <div className='chat chat-end'>
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img alt='avatar'/>
            </div>
        </div>

        <div className={`chat-bubble text-white`}>
            {/* Hi! Whats up! */}
            {message.message}
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
            12:42
        </div>
    </div>
  )
}

export default Message