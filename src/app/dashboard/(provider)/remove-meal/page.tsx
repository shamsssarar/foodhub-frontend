"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // 🟢 Import Dialog Components
import {
  ArrowLeft,
  Trash2,
  AlertTriangle,
  UtensilsCrossed,
} from "lucide-react";
import { toast } from "sonner";

export default function RemoveMealPage() {
  const router = useRouter();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🟢 New State to control the Custom Modal
  // It stores the ID and Name of the item we MIGHT delete
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Meals
  const fetchMyMeals = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/meals/my-meals`,
        {
          headers: { Authorization: token! },
        },
      );
      const data = await res.json();
      if (data.success) {
        setMeals(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMeals();
  }, []);

  // 2. The Real Delete Logic (Called only after confirmation)
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/meals/${itemToDelete.id}`,
        {
          method: "DELETE",
          headers: { Authorization: token! },
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Item removed from menu", {
          description: `${itemToDelete.name} has been deleted.`,
        });
        fetchMyMeals(); // Refresh list
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null); // Close modal
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 " />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Menu</h1>
            <p className="text-slate-500">Remove items you no longer serve.</p>
          </div>
        </div>

        {/* Loading / Empty States */}
        {loading && (
          <div className="text-center py-10 text-slate-400">
            Loading delicious items...
          </div>
        )}

        {!loading && meals.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
            <UtensilsCrossed className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">
              Your menu is empty
            </h3>
            <p className="text-slate-500">Add some items to get started!</p>
            <Button
              onClick={() => router.push("/dashboard/add-meal")}
              className="bg-primary hover:bg-orange-600 shadow-md shadow-orange-100 cursor-pointer mt-8"
            >
              + Add New Meal
            </Button>
          </div>
        )}

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <Card
              key={meal.id}
              className="group overflow-hidden hover:shadow-md transition-all border-slate-100 bg-white"
            >
              <div className="flex flex-row h-28">
                {/* Image Section */}
                <div className="w-28 h-28 relative shrink-0">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800 line-clamp-1">
                        {meal.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {meal.description}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      ${meal.price}
                    </span>
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-3 text-xs font-medium transition-colors"
                      // 🟢 OPEN MODAL instead of window.confirm
                      onClick={() =>
                        setItemToDelete({ id: meal.id, name: meal.name })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* 🟢 THE BEAUTIFUL CUSTOM CONFIRMATION MODAL */}
        <Dialog
          open={!!itemToDelete}
          onOpenChange={(open) => !open && setItemToDelete(null)}
        >
          <DialogContent className="sm:max-w-md bg-white border-none shadow-xl rounded-2xl">
            <DialogHeader className="flex flex-col items-center gap-4 pb-2">
              {/* Icon Circle */}
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>

              <div className="text-center space-y-2">
                <DialogTitle className="text-xl text-slate-900">
                  Remove Item?
                </DialogTitle>
                <DialogDescription className="text-center text-slate-500">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-800">
                    "{itemToDelete?.name}"
                  </span>
                  ?
                  <br />
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </DialogHeader>

            <DialogFooter className="flex gap-2 sm:justify-center w-full mt-4">
              <Button
                variant="outline"
                onClick={() => setItemToDelete(null)}
                className="w-full sm:w-auto rounded-full border-slate-200"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="w-full sm:w-auto rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete it"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
