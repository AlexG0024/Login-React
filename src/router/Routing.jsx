import React from 'react'
import {Routes, Route,  BrowserRouter, Link} from 'react-router-dom';
import { Dashboard } from '../components/dashboard/Dashboard';
import Error404 from '../components/dashboard/Error404';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Exit } from '../components/user/Exit';
import { Login } from '../components/user/Login';
import { Profile } from '../components/user/Profile';
import { Register } from '../components/user/Register';
import { AuthProvider } from '../context/AuthProvider';

export const Routing = () => {
  return (
    <BrowserRouter>       
        <AuthProvider>
          <Routes>

            <Route path="/" element={ <PublicLayout/> }>
                <Route index element={ <Login /> }/>
                <Route path="login" element={ <Login /> }/>
                <Route path="register" element={ <Register /> }/>
            </Route>

            <Route path="/dashboard" element={ <PrivateLayout/> }>
                <Route index element={ <Dashboard /> }/> 
                <Route path='perfil/:userId' element={<Profile />}/>  
                <Route path='exit' element={<Exit />}/>  
                           
            </Route>


              <Route path='*' element={
                <>
                  <Error404/>
                </>
              }/>
          </Routes>
        </AuthProvider>
        
    </BrowserRouter>
  )
}
