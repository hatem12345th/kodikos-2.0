import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>s</h1>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { 
            path: '/dashboard', 
            element: <h1>sss</h1> 
          },
         
          { 
            path: '*', 
            element: <h1>Not fond</h1> 
          },
        ],
      },
    ],
  },
]);
