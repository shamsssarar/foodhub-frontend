"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pizza, Coffee, Utensils, Wheat, Beef, Fish, IceCream, CupSoda } from "lucide-react";

// --- Mock Brand Data ---
// We use Lucide icons alongside text to simulate brand logos
const brands = [
  { name: "Urban Burger", icon: Beef },
  { name: "Slice Haven", icon: Pizza },
  { name: "Brew & Co.", icon: Coffee },
  { name: "Green Bowl", icon: Wheat },
  { name: "Ocean Bites", icon: Fish },
  { name: "Sweet Scoops", icon: IceCream },
  { name: "The Grillery", icon: Utensils },
  { name: "Thirst Trap", icon: CupSoda },
];

// To make the infinite scroll perfectly seamless, we duplicate the array 3 times.
// When the animation translates by exactly one-third (-33.33%), it invisibly snaps back to 0.
const duplicatedBrands = [...brands, ...brands, ...brands];

export default function PartnerBrands() {
  return (
    <section className="bg-gray-950 py-12 relative overflow-hidden border-y border-gray-900 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div className="mb-8 z-10 relative">
        <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold text-center">
          Trusted by top-rated restaurant partners
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full max-w-[100vw] overflow-hidden flex items-center">
        
        {/* Left Fade Mask */}
        <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Mask */}
        <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Content */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max px-8"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25, // Adjust this number to make it scroll faster/slower
          }}
        >
          {duplicatedBrands.map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-600 transition-all duration-300 cursor-pointer grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:text-white"
              >
                <Icon size={32} strokeWidth={1.5} />
                <span className="text-2xl font-black tracking-tighter font-sans whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}