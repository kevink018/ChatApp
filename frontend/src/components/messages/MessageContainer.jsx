import {useEffect} from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessageContainer = () => {
    // const noChatSelected = true;

    const { selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {

        //cleanup unmount fn
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? ( <NoChatSelected />) : (
        <>
        {/* Header */}
        <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>
                To:
            </span>{" "}

            <span className='text-gray-900 font-bold'> 
                {/* change name of To: dynamic */}
                {selectedConversation.fullName} </span>
        </div>

        <Messages />

        <MessageInput />
        </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p> Welcome to Chat Room</p>
                <p> Start Chatting with Friends</p>
            </div>
        </div>
    )
}