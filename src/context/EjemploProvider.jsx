import React, { useState, createContext } from 'react'

const EjemploContext = createContext();

export const EjemploProvider = ({children}) => {
  
  const [compartido, setCompartido] = useState("Compartido en todo lso componentes")
  
  return (
    <EjemploContext.Provider
      compartido  
    >
      {children}
    </EjemploContext.Provider>
  )
}
