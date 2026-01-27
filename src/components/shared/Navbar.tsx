import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react"; // Icons come free with Shadcn!

export default function Navbar() {
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
          <Link href="/providers" className="hover:text-primary transition-colors">
            Restaurants
          </Link>
        </nav>

        {/* 3. Actions (Cart & Login) */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
              0
            </span>
          </Button>
          
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}