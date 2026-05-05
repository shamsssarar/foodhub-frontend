"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, Truck, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Clock,
    title: "Lightning Fast",
    description: "Hot food at your door in under 30 minutes. We value your time as much as you do.",
    // We use theme-agnostic colors for the icons to make them pop against any background
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    shadow: "group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]",
  },
  {
    id: 2,
    icon: ShieldCheck, // Upgraded from CheckCircle for a more "trusted" feeling
    title: "Verified Quality",
    description: "Every restaurant partner undergoes strict quality control. Only the best make the cut.",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    shadow: "group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]",
  },
  {
    id: 3,
    icon: Truck,
    title: "Free Delivery",
    description: "Enjoy $0 delivery fees on your first order and all subsequent orders over $50.",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    shadow: "group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]",
  }
];

export default function WhyChooseUs() {
  return (
    // Replaced hardcoded 'bg-white' with 'bg-background' to strictly follow your theme provider
    <section className="py-24 bg-background relative overflow-hidden">
      
      {/* Subtle Background Texture/Glow - automatically adapts to theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Promise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Why <span className="text-primary">Choose Us?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            We are more than just a delivery service. We are your partner in ending hunger with taste, speed, and uncompromising quality.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`group relative p-8 md:p-10 rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:-translate-y-2 ${feature.shadow}`}
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-t-3xl transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100" />

              {/* Icon Container */}
              <div className={`h-16 w-16 mb-8 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${feature.iconBg}`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              
              {/* Text Content */}
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}