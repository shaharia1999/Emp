
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Home from './Home.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx'
import Private from './Private.jsx';
import CreateInvoice from './CreateInvoice.jsx';
import Leave from './Leave.jsx';
import Employers from './Employer.jsx';
import Admin from './Adimn.jsx';
import React from 'react';
import DashBoard from './DashBoard/DashBoard.jsx';
import DashBoardHome from './DashBoard/DashBoardHome.jsx';
import Status from './DashBoard/Status.jsx';
import Payment_invoice from './Payment_Invoice/Payment_invoice.jsx';


const router = createBrowserRouter([{
  path: '/',
  element: <App></App>,
  children: [
    {
      path: '/',
      element: <Home></Home>,
      children: [
        {
          path: '/',
          element: <Login></Login>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        // {
        //   path: '/profile',
        //   element: <Private><Profile></Profile></Private>
        // },
        {
          path: '/invoice',
          element: <Admin><CreateInvoice></CreateInvoice></Admin>
        },
        {
          path: '/student',
          element:<Employers></Employers>,
          
        },
        {
          path: '/student/:id',
          element:<Payment_invoice></Payment_invoice>,
          
        },

       
       
        {
          path: '/dashboard',
          element: <DashBoard />,
          children: [
            {
              path: '',
              element: <DashBoardHome/>,
            },
            {
              path: 'leave',
              element: <Leave />,
            },
            {
              path: 'status',
              element: <Status />,
            },
            {
              path: 'profile',
               element: <Private><Profile></Profile></Private>,
            },
            // Other child routes
          ],
        }
      ]
    },


  ]
},
])
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
  <div>
    <RouterProvider router={router} />
    {/* <Outlet></Outlet> */}
    </div>
   </React.StrictMode>
)
