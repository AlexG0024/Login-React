import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState(false);


  const notifySuccess = () => {
    toast.success('¡Registro exitoso ', {
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
    toast.error('Error, Al registrar el usuario!!', {
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

  const saveUser = async (e) => {
    // Prevenir actualización de pantalla
    e.preventDefault();

    // Recoger datos del formulario
    let newUser = form;    

    // Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await request.json();
    //console.log(data)

    if (data.status === "success") {
        notifySuccess()
        setSaved(true);
    } else {
        notifyError()
        setSaved(false);
    }
};


  return (
    <div className="flex justify-center">
      <form
        onSubmit={saveUser}
        className="bg-white p-10 rounded shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <h2 className="text-center text-2xl font-bold mb-5">Register</h2>
        <div className="mb-5">
          <label htmlFor="text" className="block font-bold mb-2">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"  
            autoComplete ="off"          
            onChange={changed}
            className="border border-gray-400 p-2 w-full"
            required
          />
        </div>


        <div className="mb-5">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"            
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
            autoComplete="off"            
            onChange={changed}
            className="border border-gray-400 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          value="Register"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
