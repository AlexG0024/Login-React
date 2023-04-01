import React from 'react'
import { useState, useEffect, createContext } from 'react';
import { Global } from '../helpers/Global';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
   
    
    const [auth, setAuth] =useState({})
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        authUser();
    },[])



    const authUser = async () => {
         
        //Sacar datos de usuario identificado del localstorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        

        // Comprobar si tengo el token y el user 
        if (!token && !user){                          
            return false
        }

        // Transformer los datos a un objeto de javaScrept
        const userObj = JSON.parse(user)
        const userId = userObj.id


        //petición ajax del backend que compruebe el token
        // que me devuelva todos los datos del usuario 
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json();
        
        // Setear el estado de auth
        setAuth(data.user)
         
    }   

    return (
    <AuthContext.Provider
        value={{
          auth,
          setAuth, 
          setLoading,
          loading  
         }}
    >
      {children}
    </AuthContext.Provider>)
}

export default AuthContext



