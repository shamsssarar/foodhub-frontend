"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/app/loading";

interface AddMealModalProps {
  orderId: string;
  onSuccess: () => void;
}

export default function AddMealToOrderModal({
  orderId,
  onSuccess,
}: AddMealModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [myMeals, setMyMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch My Menu Items when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchMenu = async () => {
        const token = localStorage.getItem("accessToken");
        // Ensure you have an endpoint that gets provider's own meals
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/meals/my-meals`, {
          headers: { Authorization: token! },
        });
        const data = await res.json();
        if (data.success) setMyMeals(data.data);
      };
      fetchMenu();
    }
  }, [isOpen]);

  // 2. Handle Adding Item
  const handleAddItem = async (mealId: string) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders/add-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
          body: JSON.stringify({ orderId, mealId }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Item added to order!");
        setIsOpen(false);
        onSuccess(); // Refresh dashboard
      } else {
        toast.error("Failed to add item");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-xs border-dashed border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <Plus className="w-3 h-3 mr-1" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to Order #{orderId.slice(0, 6)}</DialogTitle>
          <DialogDescription>
            Choose a meal from your menu to add to this order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-2 max-h-[60vh] overflow-y-auto">
          {myMeals.length === 0 ? (
            <div className="text-sm text-gray-500">
              <Loading />
            </div>
          ) : (
            myMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={meal.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{meal.name}</p>
                    <p className="text-xs text-gray-500">${meal.price}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddItem(meal.id)}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Add
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
