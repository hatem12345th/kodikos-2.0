"use client";

import { Button, Link, User } from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SquaresFour,
  Receipt,
  Invoice,
  ChartPie,
  GearSix,
  SignOut,
  CaretRight,
  List,
  X,

} from "@phosphor-icons/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  
  const menuItems = [
    { name: "Dashboard", icon: <SquaresFour size={24} />, path: "/dashboard" },
    { name: "Incoming ", icon: <Receipt size={24} />, path: "/incoming-invoices" },
    { name: "Outgoing ", icon: <Invoice size={24} />, path: "/outgoing-invoices" },
    { name: "Analytics", icon: <ChartPie size={24} />, path: "/analytics" },
  ];

  const bottomItems = [
    { name: "Settings", icon: <GearSix size={24} />, path: "/settings" },
    { name: "Sign Out", icon: <SignOut size={24} />, path: "/" },
  ];

  const handleNavigate = (path: string) => navigate(path);

  const getButtonProps = (path: string) => {
    return {
     
      size: "lg" as const,
      className: `w-full flex items-center transition-all duration-200 rounded-lg ${
        open ? "justify-start" : "justify-center"
      }`,
    };
  };

  return (
    <aside className={`transition-all duration-300 flex flex-col gap-12 h-screen dark:border-r dark:border-default-200  shadow-lg ${open ? "w-64" : "w-20"}`}>
      {/* Header */}
    
      <div className={`flex items-center p-4  ${open ? "justify-between" : "justify-center"}`}>
        {open && <span className="text-xl font-bold">Menu</span>}
        <Button isIconOnly variant="light" size="sm" onPress={() => setOpen(!open)}>
          {open ? <X size={20} /> : <List size={20} />}
        </Button>
      </div>

<div className="flex items-center justify-between gap-8 mx-auto">

      <User
  avatarProps={{
    src: 'https://avatars.githubusercontent.com/u/30373425?v=4'
  }}
  description={<Link href="https://x.com/jrgarciadev" size="sm">@jrgarciadev</Link>}
  name="Junior Garcia"

/>
<ThemeSwitcher />
    </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button key={item.name}   onPress={() => handleNavigate(item.path)} className={`w-full flex items-center transition-all duration-200 rounded-lg ${
        open ? "justify-start" : "justify-center"
      }`}   
         variant= {location.pathname === item.path ? "solid" : "light"}
      >
            {item.icon}
            {open && (
              <>
                <span className="ml-3 font-medium">{item.name}</span>
                <CaretRight className="ml-auto" size={16} />
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* Bottom Navigation + Theme Toggle */}
      <div className=" p-4 space-y-2">
        {bottomItems.map((item) => (
          <Button key={item.name} onClick={() => handleNavigate(item.path)} {...getButtonProps(item.path)}
             onPress={() => handleNavigate(item.path)} className={`w-full flex items-center transition-all duration-200 rounded-lg ${
        open ? "justify-start" : "justify-center"
      }`}   
                     variant= {location.pathname === item.path ? "solid" : "light"}
          >
            {item.icon}
            {open && <span className="ml-3 font-medium">{item.name}</span>}
          </Button>
        ))}

        
      </div>
    </aside>
  );
}
