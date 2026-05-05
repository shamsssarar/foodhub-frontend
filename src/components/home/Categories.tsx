"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Pizza, Coffee, Beer, IceCream } from "lucide-react";
import { FaHamburger } from "react-icons/fa";
import { GiChickenLeg, GiSushis } from "react-icons/gi";
import Link from "next/link";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Fast, crisp stagger sequence
      delayChildren: 0.1,
    },
  },
};

const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 1,
    },
  },
};

const categories = [
  { id: 1, name: "Pizza", icon: Pizza },
  { id: 2, name: "Burger", icon: FaHamburger },
  { id: 3, name: "Chicken", icon: GiChickenLeg },
  { id: 4, name: "Dessert", icon: IceCream },
  { id: 5, name: "Sushi", icon: GiSushis },
  { id: 6, name: "Beverages", icon: Beer },
];

export default function Categories() {
  return (
    // Used theme-controlled background
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Animated Heading (Scale/Fade only, no sliding) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Browse by <span className="text-primary">Category</span>
          </h2>
        </motion.div>

        {/* Staggered Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={popInVariants}>
              <Link
                href={`/meals?category=${cat.name}`}
                className="group flex flex-col items-center gap-4 p-2 focus:outline-none"
              >
                {/* 
                  The Icon Circle: 
                  Added Framer Motion hover physics (whileHover/whileTap) for a tactile feel 
                */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-card shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] transition-colors duration-300 relative overflow-hidden"
                >
                  {/* Subtle hover background glow inside the circle */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                  
                  <cat.icon className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10" />
                </motion.div>

                {/* Text Label */}
                <span className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}