import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  // TODO: Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}