import {
    createBrowserRouter,
    
  } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard";
import TaskCard from "../componants/TaskCard";
import Home from "../componants/Home";
import Privateroute from "../Privateroute";
import TaskBoard from "../componants/TaskBoard";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children:[
        {
          path: "/",
          element: <App></App>,
        },
        {
          path: "/tasks",
          element: <Privateroute><TaskCard></TaskCard></Privateroute>,
        },
        {
          path: "/seetasks",
          element: <TaskBoard></TaskBoard>,
        },
      ]
    },
    
    
  ]);
export default router;