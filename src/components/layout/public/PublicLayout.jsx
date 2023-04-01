import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Header } from "./Header";
export const PublicLayout = () => {
  const {auth, loading} = useAuth()

  useEffect(() => {
    //localStorage.clear();
  },[])
  
  return (
    <>
      <Header/>
      {!auth._id ?
          <Outlet />
        : <Navigate to="/dashboard" />
      }      
    </>
  );
};

/**
 * @param {auth} es un objeto que se utiliza para pasar
 * información de autenticación a través de la
 * jerarquía de componentes de una aplicación React.
 */
