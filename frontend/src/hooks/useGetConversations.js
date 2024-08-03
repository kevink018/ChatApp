// import React from 'react'
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                // if (!res.ok) {
                //     // Check if response status is not OK
                //     const errorData = await res.json();
                //     throw new Error(errorData.message || 'Something went wrong');
                // }

                if (data.error) {
                    throw new Error(data.error)
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    },[])

    return {loading, conversations}
}

export default useGetConversations