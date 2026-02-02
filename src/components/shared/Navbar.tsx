"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { User, LogOut, Menu } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- NavLinks Component ---
const NavLinks = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <>
    <Link
      href="/"
      onClick={onClick}
      className={`hover:text-primary transition-colors ${className}`}
    >
      Home
    </Link>
    <Link
      href="/meals"
      onClick={onClick}
      className={`hover:text-primary transition-colors ${className}`}
    >
      Menu
    </Link>
    <Link
      href="/orders"
      onClick={onClick}
      className={`hover:text-primary transition-colors ${className}`}
    >
      My Orders
    </Link>
  </>
);

export default function Navbar() {
  const { isLoading } = useAuth();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { clearCart } = useCart();

  // --- Logic for Colors ---
  const isHomePage = pathname === "/";
  const isSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("userRole");
    if (token && storedName && storedRole) {
      (setUserName(storedName), setUserRole(storedRole));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    clearCart();
    window.location.href = "/login";
  };
  const NavLinks = ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => (
    <>
      <Link
        href="/"
        onClick={onClick}
        className={`hover:text-primary transition-colors ${className}`}
      >
        Home
      </Link>
      <Link
        href="/meals"
        onClick={onClick}
        className={`hover:text-primary transition-colors ${className}`}
      >
        Menu
      </Link>

      {userRole === "PROVIDER" ? (
        <Link
          href="/dashboard"
          onClick={onClick}
          className={`hover:text-primary transition-colors ${className}`}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/orders"
          onClick={onClick}
          className={`hover:text-primary transition-colors ${className}`}
        >
          My Orders
        </Link>
      )}
    </>
  );

  if (isLoading) return null;

  return (
    <header
      className={cn(
        "w-full z-50 transition-all duration-300 border-b",
        isHomePage ? "fixed top-0" : "sticky top-0",
        isSolid
          ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-sm py-0"
          : "bg-transparent border-transparent py-2",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* LEFT: Logo & Mobile Trigger */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isSolid ? "text-black" : "text-white"}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-76">
                <SheetHeader>
                  <SheetTitle className="text-left text-2xl font-bold text-primary mb-4">
                    Food<span className="text-foreground">Hub</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 text-lg font-medium mt-4">
                  <NavLinks className="px-2 py-2 hover:bg-gray-100 rounded-md block text-black" />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="text-2xl font-bold text-primary">
            Food
            <span
              className={cn(
                "transition-colors",
                isSolid ? "text-foreground" : "text-white",
              )}
            >
              Hub
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Nav Links */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-8 text-sm font-bold tracking-wide transition-colors",
            "absolute left-1/2 top-1/2 -translate-x-[45%] -translate-y-1/2",
            isSolid ? "text-gray-800" : "text-white",
          )}
        >
          <NavLinks />
        </nav>

        {/* RIGHT: User & Cart */}
        <div className="flex items-center gap-4">
          <div className={isSolid ? "text-black" : "text-white"}>
            <CartDrawer />
          </div>

          {userName ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={isSolid ? "outline" : "secondary"}
                  className={cn(
                    "flex items-center gap-2 h-9 px-3 lg:px-4",
                    !isSolid &&
                      "bg-white/20 text-white hover:bg-white/30 border-transparent",
                  )}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Hi, {userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  size="sm"
                  variant={isSolid ? "default" : "secondary"}
                  className={
                    !isSolid
                      ? "bg-transparent text-primary hover:bg-gray-100"
                      : ""
                  }
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
