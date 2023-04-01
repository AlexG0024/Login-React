import React from 'react';
import { NavLink } from 'react-router-dom';

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-8">Error 404</h1>
      
      <p className="text-lg mb-4">Lo siento, la página que estás buscando no se encuentra.</p>
      <NavLink to="/dashboard" className="text-blue-600 hover:underline">Volver al inicio</NavLink>
    </div>
  );
}

export default Error404;
