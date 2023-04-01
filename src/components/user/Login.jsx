import { useState } from 'react';
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {

  const {form, changed} = useForm({}) 
  const [saved, setSaved] =useState("not_sended")

  const {setAuth,setLoading}= useAuth()



  const notifySuccess = () => {
    toast.success('¡Bienvenido! Has iniciado sesión correctamente. ', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const notifyError = () => {
    toast.error('Error, Usuario o Contraseña incorrecta   !!', {
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



  const loginUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    //Datos del formulario 
    let userTologin = form    

    // Petición al backend
    const request = await fetch(Global.url + 'user/login',{
      method: 'POST',
      body: JSON.stringify(userTologin),
      headers: {
        "Content-Type": "application/json"
      }
    })

    // Datos de la repuesta del backend
    const data = await request.json()
  
    // Guardar los datos el el navegador o localStorage
    if (data.status === "success") {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setSaved("login")

      // set datas en el auth
      setAuth(data.user)
      notifySuccess()
      // Redirection
      setTimeout(() => {
        window.location.reload()   
      },2000)      
          
      
      
    }else {
      notifyError()
      setSaved("error")
    }
  }

  return (
    <>
    <div className="flex justify-center">
      <form
        onSubmit={loginUser}
        className="bg-white p-10 rounded shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <h2 className="text-center text-2xl font-bold mb-5">Login</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"            
            onChange={changed}
            className="border border-gray-400 p-2 w-full"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"            
            onChange={changed}
            className="border border-gray-400 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          value="Login"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>  
    <ToastContainer />  
    </>

  );
}
