"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Flame, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- Expanded & Enhanced Dummy Data ---
const featuredMeals = [
  {
    id: "feat-1",
    name: "Cheesy Pepperoni Pizza",
    category: "Pizza",
    price: 12.99,
    rating: 4.8,
    prepTime: "15-20 min",
    calories: "850 kcal",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-2",
    name: "Double Beef Burger",
    category: "Burger",
    price: 9.99,
    rating: 4.5,
    prepTime: "10-15 min",
    calories: "920 kcal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-3",
    name: "Spicy Chicken Wings",
    category: "Chicken",
    price: 8.50,
    rating: 4.7,
    prepTime: "15-20 min",
    calories: "640 kcal",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-4",
    name: "Fresh Sushi Platter",
    category: "Sushi",
    price: 18.99,
    rating: 4.9,
    prepTime: "20-25 min",
    calories: "420 kcal",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-5",
    name: "Truffle Mushroom Pasta",
    category: "Pasta",
    price: 14.50,
    rating: 4.6,
    prepTime: "15-20 min",
    calories: "780 kcal",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-6",
    name: "Grilled Salmon Bowl",
    category: "Healthy",
    price: 16.99,
    rating: 4.9,
    prepTime: "10-15 min",
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function FeaturedFood() {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent, meal: any) => {
    e.preventDefault(); // Prevent standard link navigation if wrapper is a link
    e.stopPropagation(); // Stop event bubbling
    
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      imageUrl: meal.image
    });
    router.push(`/meals?category=${meal.category}`);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <Sparkles className="text-red-500 w-5 h-5" />
              <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
                Chef's Recommendations
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Popular <span className="text-red-600">Meals</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Link href="/meals" className="hidden md:block">
               <Button variant="outline" className="rounded-full px-6 border-2 hover:border-red-500 hover:text-red-500 transition-colors">
                 View Full Menu <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
            </Link>
          </motion.div>
        </div>

        {/* Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredMeals.map((meal) => (
            <motion.div 
              key={meal.id} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(220,38,38,0.1)] transition-all duration-300 rounded-3xl overflow-hidden bg-white h-full flex flex-col cursor-pointer">
                
                {/* Image & Top Badges Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent z-10" />
                  
                  <img 
                    src={meal.image} 
                    alt={meal.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Top Left: Rating Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{meal.rating}</span>
                  </div>

                  {/* Top Right: Category Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {meal.category}
                  </div>

                  {/* Bottom Image Meta: Time & Calories */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-white text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-200" />
                      {meal.prepTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      {meal.calories}
                    </div>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                      {meal.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-black text-gray-900">
                      ${meal.price}
                    </span>
                    
                    <Button 
                      className="rounded-full bg-gray-900 hover:bg-red-600 text-white px-6 shadow-lg group-active:scale-95 transition-all duration-300"
                      onClick={(e) => handleAddToCart(e, meal)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
            <Link href="/meals">
                <Button variant="outline" className="w-full rounded-xl py-6 border-2 text-lg font-semibold">
                  View Full Menu
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}