// import React from 'react'
import {useState, useEffect} from 'react'
import toast from 'react-hot-toast'

const useGetMessages = () => {

    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {

        const getMessages = async () => {
            setLoading(true)

            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json();
                setMessages(data)
            }

            catch (error) {
                toast.error(error.message)
            }
        }

        if (selectedConversation._id) getMessages()
    }, [selectedConversation._id, setMessages])

    return { messages, loading}
}

export default useGetMessages