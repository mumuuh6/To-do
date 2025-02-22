import {
    createBrowserRouter,
    
  } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard";
import TaskCard from "../componants/TaskCard";
import Home from "../componants/Home";

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
          element: <TaskCard></TaskCard>,
        },
      ]
    },
    
    
  ]);
export default router;