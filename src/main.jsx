import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,Outlet,RouterProvider,} from "react-router-dom";
import Home from './Home.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx'
import Private from './Private.jsx';
import ForHome from './ForHome.jsx';
import CreateInvoice from './CreateInvoice.jsx';
const router=createBrowserRouter([{
  path:'/',
  element:<App></App>,
  children:[
    {
      path:'/',
      element:<Home></Home>,
      children:[
        {
          path:'/',
          element:<ForHome></ForHome>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/profile',
          element:<Private><Profile></Profile></Private>
        },
        {
          path:'/invoice',
          element:<CreateInvoice></CreateInvoice>
        }
      ]
    },


  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
     <Outlet></Outlet>
  </React.StrictMode>,
)
