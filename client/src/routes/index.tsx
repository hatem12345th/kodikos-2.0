import ProtectedRoute from "@/components/ProtectedRoute";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { DashboardLayout } from "@/layout";
import { Button, Card } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: '/',
    element:  <></>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { 
            path: '/dashboard', 
            element: <ThemeSwitcher /> 
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
