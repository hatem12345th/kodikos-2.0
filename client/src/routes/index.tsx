import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardLayout, OutgoingInvoicesLayout } from "@/layout";
import { Analytics, DashboardPage, LandingPage, OutgoingInvoices } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/incoming-invoices",
            element: <DashboardPage />,
          },
          {
            path: "/outgoing-invoices",
            element: <OutgoingInvoicesLayout />,
          },
          {
            path: "/Analytics",
            element: <Analytics />,
          },
           {
            path: "/dashboard",
            element: <Analytics />,
          },
          {
            path: "*",
            element: <h1>Not fond</h1>,
          },
        ],
      },
    ],
  },
]);
