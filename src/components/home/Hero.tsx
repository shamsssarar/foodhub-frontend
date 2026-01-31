"use client";

import { Button } from "../ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/meals?search=${query}`); // Send search term to Menu page
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
          alt="Delicious Food Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-black/90 via-black/50 to-black/30" />
      </div>

      <div className="container relative z-10 px-4 text-center space-y-8">
        {/* Animated Text */}
        <div className="space-y-4 animate-in fade-in zoom-in duration-700">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Delicious Food, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
              Delivered To You.
            </span>
          </h1>
          
          <p className="text-gray-200 md:text-xl max-w-2xl mx-auto font-medium drop-shadow-sm">
            Choose from thousands of restaurants and get your favorite meals delivered fast. 
            <span className="text-orange-300 font-bold"> Fresh, hot, and tasty!</span>
          </p>
        </div>

        {/* 2. Functional Search Bar (Glassmorphism) */}
        <div className="flex w-full max-w-md mx-auto items-center space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl transition-transform hover:scale-105 duration-300">
          <Input 
            type="text" 
            placeholder="Search for burger, pizza..." 
            className="border-0 bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 text-lg px-4 h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            size="icon" 
            className="rounded-full h-12 w-12 bg-primary hover:bg-orange-600 border-none"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
        
        {/* 3. Working Buttons */}
        <div className="flex justify-center gap-4 pt-4 animate-in slide-in-from-bottom-5 duration-1000 delay-200">
          <Link href="/meals">
            <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-orange-500/20 shadow-lg hover:shadow-orange-500/40 transition-all">
              Order Now
            </Button>
          </Link>
          <Link href="/meals">
            <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-lg h-14 px-8 bg-transparent text-white border-white hover:bg-white hover:text-black transition-all"
            >
              View Menu <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}