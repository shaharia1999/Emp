import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,Outlet,RouterProvider,} from "react-router-dom";
import Home from './Home.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import Profile from './Profile.jsx'
const router=createBrowserRouter([{
  path:'/',
  element:<App></App>,
  children:[
    {
      path:'/',
      element:<Home></Home>
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/profile',
      element:<Profile></Profile>
    }
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar></NavBar>
    <RouterProvider router={router} />
     <Outlet></Outlet>
  </React.StrictMode>,
)
