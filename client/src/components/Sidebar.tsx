import { Button } from "@heroui/react";
import { Home, Users, Settings, Menu as MenuIcon, X } from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const menuItems = [
    { name: "Home", icon: <Home /> },
    { name: "Users", icon: <Users /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <aside className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-bold">{open ? "Dashboard" : "DB"}</span>
        <Button isIconOnly variant="light" onPress={() => setOpen(!open)}>
          {open ? <X /> : <MenuIcon />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button key={item.name} variant="ghost" size="sm" className="w-full justify-start" isIconOnly={!open}>
            {item.icon}
            {open && <span className="ml-2">{item.name}</span>}
          </Button>
        ))}
      </nav>
    </aside>
  );
}