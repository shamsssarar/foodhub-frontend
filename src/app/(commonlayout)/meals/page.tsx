"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import Loading from "../../loading";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation"; // <--- 1. Import this
import { toast } from "sonner";
import { DEFAULT_MEALS, Meal } from "./constants";

function MenuContent() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Get the URL params
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search"); // e.g. "Burger"

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addItem } = useCart();

  // 3. LISTEN to URL changes
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [urlCategory, urlSearch]);

useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);

      // 🟢 1. Check if user is logged in
      const token = localStorage.getItem("accessToken");

      // 🛑 2. IF VISITOR (No Token): FORCE DUMMY DATA

      if (!token) {
        setMeals(DEFAULT_MEALS);
        setLoading(false);
        return; 
      }

      // 🟢 3. IF LOGGED IN: FETCH REAL DATA
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/meals`, {
           cache: "no-store" 
        });
        const data = await res.json();
        
        if (data.success && data.data.length > 0) {
          // Show their real database meals
          setMeals(data.data);
        } else {
          // If they are logged in but haven't added meals yet, show defaults
          setMeals(DEFAULT_MEALS);
        }
      } catch (error) {
        setMeals(DEFAULT_MEALS); 
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(meals.map((meal) => meal.category?.name).filter(Boolean)),
    ),
  ];

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || meal.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-muted-foreground">
              Choose from our delicious selection
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food..."
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY TABS */}
        {!loading && (
          <div className="flex gap-3 overflow-x-auto pb-6 mb-4 scrollbar-hide p-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={cn(
                  "rounded-full px-6 transition-all",
                  selectedCategory === cat
                    ? "shadow-md scale-105"
                    : "bg-white hover:bg-orange-50 border-gray-200",
                )}
              >
                {cat === "All" && <Utensils className="w-4 h-4 mr-2" />}
                {cat}
              </Button>
            ))}
          </div>
        )}

        {loading && <Loading />}

        {!loading && filteredMeals.length === 0 && (
          <div className="text-center py-20 text-muted-foreground flex flex-col items-center">
            <Search className="h-12 w-12 opacity-20 mb-4" />
            <p className="text-lg font-medium">No meals found.</p>
            <p className="text-sm">Try changing the category or search term.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="mt-2 text-primary"
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <Card
              key={meal.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-none shadow-sm bg-white"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img
                  src={
                    meal.imageUrl ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60"
                  }
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-white px-3 py-1 bg-black/50 backdrop-blur-md rounded-full">
                    {meal.category?.name || "Food"}
                  </span>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg leading-tight text-slate-800">
                    {meal.name}
                  </h3>
                  <span className="font-bold text-lg text-primary">
                    ${meal.price}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
                  {meal.description || "No description available."}
                </p>
                <Button
                  className="w-full font-bold shadow-md shadow-orange-100 active:scale-95 transition-transform hover:opacity-90 cursor-pointer"
                  onClick={() => {
                    addItem({
                      id: meal.id,
                      name: meal.name,
                      price: meal.price,
                      quantity: 1,
                      imageUrl: meal.imageUrl || "",
                    });
                    toast.success(`${meal.name} added to cart! 🛒`, {
                      description: "Item is ready for checkout",
                    });
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

// Wrap in Suspense to handle search params safely
export default function MenuPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MenuContent />
    </Suspense>
  );
}
