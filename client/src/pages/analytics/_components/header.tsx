'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

export function Header() {
  return (
    <Navbar className="border-b border-divider bg-background">
      <NavbarBrand>
        <p className="font-bold text-foreground">Financial Dashboard</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <p className="text-sm text-muted-foreground">Welcome back!</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
