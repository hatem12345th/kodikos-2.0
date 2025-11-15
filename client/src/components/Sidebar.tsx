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
import { useState, useEffect } from "react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <SquaresFour size={20} />, path: "/dashboard" },
    { name: "Incoming", icon: <Receipt size={20} />, path: "/incoming-invoices" },
    { name: "Outgoing", icon: <Invoice size={20} />, path: "/outgoing-invoices" },
    { name: "Analytics", icon: <ChartPie size={20} />, path: "/analytics" },
  ];

  const bottomItems = [
    { name: "Settings", icon: <GearSix size={20} />, path: "/settings" },
    { name: "Sign Out", icon: <SignOut size={20} />, path: "/" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed space-y-8 lg:relative z-40 top-0 left-0 h-screen transition-all duration-300 flex flex-col dark:border-r dark:border-default-200 shadow-lg bg-background overflow-hidden ${
          open ? "w-64" : "w-20"
        } ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-3 lg:p-4 ">
          {open ? (
            <img
              src="/Frame 1.svg"
              alt="Kodikos Logo"
              className="h-6 lg:h-8 object-contain"
            />
          ) : (
            <img
              src="/Group 4.png"
              alt="Kodikos"
              className="h-6 lg:h-8 w-6 lg:w-8 object-contain"
            />
          )}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => setOpen(!open)}
            className="ml-auto"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </Button>
        </div>

        {/* User Profile Section */}
        {open && (
          <div className="px-3 lg:px-4 space-y-3 border-t flex gap-2 dark:border-default-200 pt-3 lg:pt-4">
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              name="Junior Garcia"
              description={
                <Link href="https://x.com/jrgarciadev" size="sm">
                  @jrgarciadev
                </Link>
              }
              classNames={{
                name: "text-sm",
                description: "text-xs",
              }}
            />
            <ThemeSwitcher />
          </div>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 px-2 lg:px-3 space-y-1 lg:space-y-2  min-h-0">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              onPress={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-2 lg:gap-3 transition-all duration-200 rounded-lg p-2 lg:p-3 ${
                open ? "justify-start" : "justify-center"
              }`}
              variant={location.pathname === item.path ? "solid" : "light"}
              size="sm"
            >
              {item.icon}
              {open && (
                <>
                  <span className="font-medium flex-1 text-left text-sm truncate">
                    {item.name}
                  </span>
                  <CaretRight size={14} className="" />
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-2 lg:px-3 pb-3 lg:pb-4 space-y-1 lg:space-y-2 border-t dark:border-default-200 pt-3 lg:pt-4 ">
          {bottomItems.map((item) => (
            <Button
              key={item.name}
              onPress={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-2 lg:gap-3 transition-all duration-200 rounded-lg p-2 lg:p-3 ${
                open ? "justify-start" : "justify-center"
              }`}
              variant={location.pathname === item.path ? "solid" : "light"}
              size="sm"
            >
              {item.icon}
              {open && (
                <span className="font-medium text-sm truncate">{item.name}</span>
              )}
            </Button>
          ))}

          {!open && (
            <div className="flex justify-center pt-2">
              <ThemeSwitcher />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}