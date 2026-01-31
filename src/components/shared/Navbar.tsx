"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { User, LogOut } from "lucide-react";
import CartDrawer from "./CartDrawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoading } = useAuth();

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("accessToken");

    if (token && storedName) {
      setUserName(storedName);
    }
  }, []);


  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // 1. Clear local state/storage
        localStorage.removeItem("accessToken");

        // 2. Redirect to login
        window.location.href = "/login";
      }
      localStorage.removeItem("userName");

      // 2. Redirect and refresh
      window.location.href = "/login"; // Full reload to clear all states
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (isLoading) {
    return (
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Food<span className="text-foreground">Hub</span>
          </Link>
          <div className="h-10 w-24 animate-pulse bg-gray-100 rounded-md" />
        </div>
      </header>
    );
  }
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 1. Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Food<span className="text-foreground">Hub</span>
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium mx-auto">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/meals" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <Link href="/orders" className="hover:text-primary transition-colors">
            My Orders
          </Link>
        </nav>

        {/* 3. Actions (Cart & Login) */}
        <div className="flex items-center gap-4">
          <CartDrawer />

          {userName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-orange-50"
                >
                  <User className="h-4 w-4" />
                  Hi, {userName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
