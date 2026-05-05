"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Bot, Box, Leaf, ArrowRight, Sparkles } from "lucide-react";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Card 1 sliding in from the left
const leftCardVariants: Variants = {
  hidden: { opacity: 0, x: -150 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 1,
    },
  },
};

// Card 2 sliding in from the right
const rightCardVariants: Variants = {
  hidden: { opacity: 0, x: 150 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 1,
    },
  },
};

// Card 3 sliding up from the bottom to anchor the grid
const bottomCardVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 1,
    },
  },
};

export default function FutureOfDining() {
  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }} // once: false allows replay
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles className="text-red-500 w-5 h-5" />
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
              The Future of Dining
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Smarter choices for a <br className="hidden md:block" /> healthier
            lifestyle.
          </motion.h2>
        </div>

        {/* Bento Box Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }} // Trigger animation every scroll
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {/* Card 1: AI Meal Plans (Slides from Left) */}
          <motion.div
            variants={leftCardVariants}
            whileHover={{ y: -8 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          >
            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Bot size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI-Curated Weekly Plans
              </h3>
              <p className="text-gray-500 max-w-md">
                Let our smart algorithm design your weekly meals based on your
                macro goals, past orders, and dietary preferences. Zero thinking
                required.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all duration-300">
              Explore AI Plans <ArrowRight size={18} className="ml-1" />
            </div>
          </motion.div>

          {/* Card 2: Subscription Boxes (Slides from Right) */}
          <motion.div
            variants={rightCardVariants}
            whileHover={{ y: -8 }}
            className="bg-gray-900 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer text-white"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gray-800 text-red-400 rounded-2xl flex items-center justify-center mb-6 border border-gray-700">
                <Box size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Mystery Subs</h3>
              <p className="text-gray-400 text-sm">
                Subscribe to get curated tasting boxes from top local chefs
                delivered every weekend.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Trending Healthy (Slides from Bottom) */}
          <motion.div
            variants={bottomCardVariants}
            whileHover={{ y: -8 }}
            className="md:col-span-3 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group cursor-pointer"
          >
            <div className="flex items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trending Organic & Healthy
                </h3>
                <p className="text-gray-500">
                  Discover farm-to-table options, keto-friendly bowls, and
                  sustainable choices trending in your city right now.
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors whitespace-nowrap">
              View Healthy Menu
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}