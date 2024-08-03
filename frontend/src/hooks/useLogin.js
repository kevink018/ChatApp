// import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {

    const success = handleInputErrors (username,password)
    if(!success) return;
    setLoading(true)
    try{
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
    })

    const data = await res.json();

    localStorage.setItem('chat-user', JSON.stringify(data))
    setAuthUser(data)
    }

    catch (error) {
        toast.error(error.message)
    }
  }
  return {loading, login}
}

export default useLogin


function handleInputErrors (username,password) {
    if (!username || !password) {
        //react hot toast for check or x icons
        console.log('Please fill in all fields')
    }

    return true
}