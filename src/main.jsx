import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import Private from "./Private.jsx";
import CreateInvoice from "./CreateInvoice.jsx";
import Leave from "./Leave.jsx";
import Employers from "./Employer.jsx";
import Admin from "./Adimn.jsx";
import React from "react";
import DashBoard from "./DashBoard/DashBoard.jsx";
import DashBoardHome from "./DashBoard/DashBoardHome.jsx";
import Status from "./DashBoard/Status.jsx";
import Payment_invoice from "./Payment_Invoice/Payment_invoice.jsx";
import TINY from "./DashBoard/RichText.jsx";
import ApproveLeave from "./DashBoard/ApproveLeave.jsx";
import TaskList from "./DashBoard/TaskList.jsx";
import Team from "./DashBoard/Team.jsx";
import DevOps from "./DashBoard/TeamDevOps/DevOps.jsx";
import TeamDelta from "./DashBoard/TeamDevOps/TeamDelta.jsx";
import SelaryInvoice from "./Payment_Invoice/SelaryInvoice.jsx";
import Certificate from "./Certificate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <Login></Login>,
          },
          {
            path: "/cer",
            element: <Certificate></Certificate>,
          },
          {
            path: "/login",
            element: <Login></Login>,
          },
          // {
          //   path: '/profile',
          //   element: <Private><Profile></Profile></Private>
          // },
          {
            path: "/invoice",
            element: (
              <Admin>
                <CreateInvoice></CreateInvoice>
              </Admin>
            ),
          },
          {
            path: "/invoice/:id",
            element: <SelaryInvoice></SelaryInvoice>,
          },
          {
            path: "/student",
            element: <Employers></Employers>,
          },
          {
            path: "/student/:id",
            element: <Payment_invoice></Payment_invoice>,
          },
          {
            path: "/team/devOps",
            element: <DevOps/>,
          },
          {
            path: "/team/delta",
            element: <TeamDelta/>,
          },

          {
            path: "/dashboard",
            element: <DashBoard />,
            children: [
            {
                path: "",
                element:<Private><DashBoardHome /></Private> ,
              
              },
              {
                path: "leave",
                element: <Leave />,
              },
              {
                path: "leaveapp",
                element: <ApproveLeave />,
              },
              {
                path: "status",
                element: <Status />,
              },
              {
                path: "task",
                element: <TINY />,
              },
              {
                path: "taskList",
                element: <TaskList />,
              },
              {
                path: "team",
                element: <Team />,
              },
            
              {
                path: "profile",
                element: (
                  <Private>
                    <Profile></Profile>
                  </Private>
                ),
              },
             
              // Other child routes
            ],
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router} />
      {/* <Outlet></Outlet> */}
    </div>
  </React.StrictMode>
);
