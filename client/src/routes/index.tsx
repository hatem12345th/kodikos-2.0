import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1> Home page </h1>} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}
