import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../public/vite.svg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 py-0 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
            <Link className="flex-shrink-0 flex items-center" to="/">
              <img className="block h-8 w-auto" src={Logo} alt="Logo" />
              <span className="text-xl ml-2 font-bold text-white">Mi App</span>
            </Link>
          

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Regístrate
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </nav>
  );
};
