// import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors ({ fullName, username, password, confirmPassword, gender})
        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender}),
            })

            const data = await res.json()
            
            //local storage
            localStorage.setItem("chat-user", JSON.stringify(data))
            //context
            setAuthUser(data)

        }

        catch (error) {
            toast.error(error.message)
        }
    }

    return {loading, signup}
}

export default useSignup