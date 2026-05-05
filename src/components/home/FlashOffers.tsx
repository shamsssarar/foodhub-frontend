"use client";

import React, { useState, useEffect } from "react";
import { motion, TargetAndTransition, Variants } from "framer-motion";
import { Timer, ArrowRight, Flame } from "lucide-react";

// --- Framer Motion Variants ---
const leftContentVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 1,
      staggerChildren: 0.2,
    },
  },
};

const rightImageVariants: Variants = {
  hidden: { opacity: 0, x: 100, rotate: 10 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      mass: 1,
    },
  },
};

const floatingAnimation: TargetAndTransition = {
  y: ["-10px", "10px", "-10px"],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function FlashOffers() {
  // --- Countdown Timer Logic ---
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 29,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              clearInterval(timer); // Timer reached 0
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper to format numbers with leading zero
  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  return (
    <section className="bg-gray-950 py-20 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
          {/* Left Column: Text & Timer */}
          <motion.div
            variants={leftContentVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center"
          >
            <motion.div
              variants={leftContentVariants}
              className="flex items-center gap-2 mb-4"
            >
              <Flame className="text-orange-500 w-6 h-6 animate-pulse" />
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">
                Deal of the Day
              </span>
            </motion.div>

            <motion.h2
              variants={leftContentVariants}
              className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              Double Beef Burger <br />
              <span className="text-red-500">Meal Combo</span>
            </motion.h2>

            <motion.p
              variants={leftContentVariants}
              className="text-gray-400 mb-8 max-w-md"
            >
              Get our signature double beef burger with large fries and a drink
              at 40% off. Hurry, this offer expires soon!
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              variants={leftContentVariants}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <Timer className="text-gray-400 w-5 h-5" />
                <span className="text-gray-300 font-medium">Ends in:</span>
              </div>
              <div className="flex gap-3 text-center">
                <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 min-w-[60px]">
                  <span className="text-2xl font-bold text-white">
                    {formatTime(timeLeft.hours)}
                  </span>
                  <p className="text-[10px] text-gray-400 uppercase mt-1">
                    Hours
                  </p>
                </div>
                <span className="text-2xl font-bold text-gray-500 self-start mt-1">
                  :
                </span>
                <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 min-w-[60px]">
                  <span className="text-2xl font-bold text-white">
                    {formatTime(timeLeft.minutes)}
                  </span>
                  <p className="text-[10px] text-gray-400 uppercase mt-1">
                    Mins
                  </p>
                </div>
                <span className="text-2xl font-bold text-gray-500 self-start mt-1">
                  :
                </span>
                <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 min-w-[60px]">
                  <span className="text-2xl font-bold text-white">
                    {formatTime(timeLeft.seconds)}
                  </span>
                  <p className="text-[10px] text-gray-400 uppercase mt-1">
                    Secs
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={leftContentVariants}
              className="flex items-center gap-4"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                Claim Offer - $9.99
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="text-gray-500 line-through text-lg font-medium">
                $16.99
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] bg-gradient-to-br from-red-600/10 to-transparent flex items-center justify-center p-10 overflow-hidden">
            {/* Circular graphic behind the burger */}
            <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-red-600/20 rounded-full blur-xl" />

            <motion.div
              variants={rightImageVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <motion.img
                animate={floatingAnimation}
                // Replace this with your actual transparent PNG from the project
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop"
                alt="Double Beef Burger"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-gray-800/50"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
