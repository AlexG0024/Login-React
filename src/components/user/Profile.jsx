import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/default.png";



export const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");


  const notifySuccess = () => {
    toast.success('Usuario Actualizado correctamente !!', {
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



  const updateUser = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");

    // Recoger datos del formulario
    let newDataUser = SerializeForm(e.target);

    // Borrar propiedad innecesario
    delete newDataUser.IMG;

    // Actualizar usuario en la Bases de Datos
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");
      notifySuccess()
    } else {
      setSaved("error");
      notifyError()
    }


    //Subida de imagen
    const fileInput = document.querySelector("#IMG");

    if (data.status == "success" && fileInput.files[0]) {
      // Recoger la imagen a subir
      const formData = new FormData();
      formData.append("IMG", fileInput.files[0]); 

      // Peticion para enviar el fichero
      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {          
          Authorization: token,
        }
      });
      const uploadData = await uploadRequest.json();

      console.log(uploadData);
      if (uploadData.status == "success" && uploadData.user) {
        delete uploadData.user.password
        setAuth(uploadData.user);
        setSaved("saved"); 
        notifySuccess()       
      } else {
        setSaved("error");
        notifyError()
      }
    }

  }

  return (
    <>
      <form
        onSubmit={updateUser}
        className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Editar perfil</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={auth.name}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={auth.email}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>


        <div className="flex items-center">
      
          <div className="w-20 h-20 rounded-full mr-4 overflow-hidden">
            {auth.image != "default.png" && (
              <img
                className="h-full object-cover" 
                src={Global.url + "user/avatar/" + auth.image} 
                alt="Avatar" 
                />
            )}
            {auth.image == "default.png" && (
              <img 
                className="h-full object-cover"
                src={avatar} 
                alt="Avatar" 
                 />
            )}           
          </div>
          
          <br />
            <input type="file" name="IMG" id="IMG" />
        </div>

        <br />


        <div className="flex items-center justify-between">
          <button            
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar cambios
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
