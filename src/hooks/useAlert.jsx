import React from 'react'
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useAlert = () => {
  
  useEffect(()=>{
    notifyErrors
  },[])
  const notifyErrors = () => {
    toast.error('Error, Usuario no se ha Actualizado !!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return {   

    
  }
}




