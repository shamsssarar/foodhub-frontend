"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MousePointerClick, ChefHat, Bike, Smile } from "lucide-react";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delays each step by 0.3s
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  show: {
    scaleX: 1,
    transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
  },
};

// --- Data ---
const steps = [
  {
    id: 1,
    title: "Choose Your Meal",
    description: "Browse thousands of menus to find the food you like.",
    icon: <MousePointerClick size={32} className="text-red-500" />,
  },
  {
    id: 2,
    title: "We Prepare It",
    description:
      "Partner restaurants prepare your meal with fresh ingredients.",
    icon: <ChefHat size={32} className="text-red-500" />,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Our riders pick up your order and deliver it swiftly.",
    icon: <Bike size={32} className="text-red-500" />,
  },
  {
    id: 4,
    title: "Enjoy Your Food",
    description: "Hot, fresh, and ready to eat. Enjoy your delicious meal!",
    icon: <Smile size={32} className="text-red-500" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-950 text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How <span className="text-red-500">FoodHub</span> Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            From your screen to your table in four simple, transparent steps.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
        >
          {/* Connecting Line (Desktop Only) */}
          <motion.div
            variants={lineVariants}
            className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-red-600/20 via-red-500 to-red-600/20 z-0"
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.05)] group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 ease-in-out">
                {step.icon}
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center border-4 border-gray-950 text-sm">
                {step.id}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
