import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen min-w-full  dark:bg-black">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <main className="w-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}