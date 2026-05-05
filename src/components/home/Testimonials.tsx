"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// --- Mock Testimonial Data ---
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Foodie & Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    text: "The AI meal planning completely changed my diet. I don't even think about what to order anymore. It just knows exactly what I crave!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Fitness Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    text: "As a coach, macros matter. FoodHub's trending healthy options make it ridiculously easy to hit my protein goals without sacrificing taste.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Busy Mom",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    text: "The fastest delivery in the city, hands down. The food arrives piping hot every single time. My kids absolutely love the pizza from here.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Smith",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    text: "The mystery subscription box is the highlight of my weekend. I've discovered so many hidden gem restaurants I would have never tried otherwise.",
    rating: 5,
  },
];

export default function Testimonials() {
  // We need to calculate the width of the carousel dynamically so Framer Motion
  // knows exactly where the drag boundaries (constraints) are.
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      // scrollWidth is total draggable width, offsetWidth is what is visible on screen
      setCarouselWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
    // Optional: Add a window resize listener here in production to recalculate width
  }, []);

  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <span className="text-yellow-500 font-semibold tracking-wider uppercase text-sm">
                Real Reviews
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Don't just take <br className="hidden md:block" /> our word for it.
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-gray-500 max-w-sm"
          >
            Swipe through to see what our community of food lovers has to say about their FoodHub experience.
          </motion.p>
        </div>

        {/* Draggable Carousel Container */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing overflow-hidden pb-8"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            dragElastic={0.1} // Adds a nice resistance when pulling past the edges
            className="flex gap-6 w-max"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="w-[320px] md:w-[400px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between relative group hover:shadow-xl transition-shadow duration-300 pointer-events-none" 
                // pointer-events-none on the card ensures dragging the text doesn't interfere with the swipe
              >
                {/* Background Quote Icon Watermark */}
                <Quote className="absolute top-6 right-6 w-20 h-20 text-gray-50 opacity-50 -rotate-12 z-0" />

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 relative z-10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}