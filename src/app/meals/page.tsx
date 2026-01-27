"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
// Define the shape of a Meal (matches your Prisma model)
interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: { name: string };
  imageUrl: string | null;
}

export default function MenuPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem } = useCart();

  // 1. Fetch Meals from Backend on Load
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/meals"); // Ensure this matches your backend route
        const data = await res.json();

        if (data.success) {
          setMeals(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // 2. Filter Meals based on Search
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-muted-foreground">
              Choose from our delicious selection
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-muted-foreground">
            Loading delicious food...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMeals.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No meals found. Try searching for something else!
          </div>
        )}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <Card
              key={meal.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={
                    meal.imageUrl ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60"
                  }
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary px-2 py-1 bg-orange-100 rounded-full">
                      {meal.category?.name || "Food"}
                    </span>
                    <h3 className="font-bold text-lg mt-2 leading-tight">
                      {meal.name}
                    </h3>
                  </div>
                  <span className="font-bold text-lg">${meal.price}</span>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {meal.description || "No description available."}
                </p>
                <Button
                  className="w-full font-bold"
                  onClick={() => {
                    addItem({
                      id: meal.id,
                      name: meal.name,
                      price: meal.price,
                      quantity: 1,
                      imageUrl: meal.imageUrl || "",
                    });
                    alert(`${meal.name} added to cart! 🛒`); // Simple feedback
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
