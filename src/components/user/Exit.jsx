import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const Exit = () => {
  const {setAuth} = useAuth()
  const navigate = useNavigate()


  useEffect(()=>{
    // Vaciar el Localstorage
    localStorage.clear()

    // Setear estados globales a vació 
    setAuth({})

    // redirection al login
    navigate('/login')
  })
  return (
    <div>Exit</div>
  )
}
