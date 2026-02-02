"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation"; // <--- 1. Import Router

// Dummy Data
const featuredMeals = [
  {
    id: "feat-1",
    name: "Cheesy Pepperoni Pizza",
    category: "Pizza",
    price: 12.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-2",
    name: "Double Beef Burger",
    category: "Burger",
    price: 9.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-3",
    name: "Spicy Chicken Wings",
    category: "Chicken", // Changed to match your Category logic (was "Chicken Wings")
    price: 8.50,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "feat-4",
    name: "Fresh Sushi Platter",
    category: "Sushi", // Changed to match your Category logic (was "Sushi")
    price: 18.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function FeaturedFood() {
  const { addItem } = useCart();
  const router = useRouter(); // <--- 2. Initialize Router

  const handleAddToCart = (meal: any) => {
    // 1. Add to Cart
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      imageUrl: meal.image
    });
    // 3. Redirect to the specific category page
    router.push(`/meals?category=${meal.category}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Popular <span className="text-primary">Meals</span></h2>
            <p className="text-muted-foreground mt-2">The best rated dishes from our partners</p>
          </div>
          
          <Link href="/meals" className="hidden md:block">
             <Button variant="outline">View All Menu</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMeals.map((meal) => (
            <Card key={meal.id} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group bg-white">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={meal.image} 
                    alt={meal.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {meal.rating}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">{meal.category}</div>
                <h3 className="font-bold text-lg leading-tight mb-2 truncate" title={meal.name}>{meal.name}</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-slate-800">${meal.price}</span>
                  
                  <Button 
                    size="sm" 
                    className="rounded-full shadow-lg shadow-orange-100 group-active:scale-95 transition-transform"
                    onClick={() => handleAddToCart(meal)}
                  >
                    Add <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link href="/meals">
                <Button variant="outline" className="w-full">View All Menu</Button>
            </Link>
        </div>
      </div>
    </section>
  );
}