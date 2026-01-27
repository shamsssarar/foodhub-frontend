"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react"; // Icons come free with Shadcn!
import { useCart } from "@/lib/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 1. Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Food<span className="text-foreground">Hub</span>
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/meals" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <Link
            href="/providers"
            className="hover:text-primary transition-colors"
          >
            Restaurants
          </Link>
        </nav>

        {/* 3. Actions (Cart & Login) */}
        <div className="flex items-center gap-4">
          <CartDrawer />

          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
