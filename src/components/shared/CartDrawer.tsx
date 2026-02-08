"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, removeItem, totalPrice, clearCart, cartCount } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    const token = localStorage.getItem("accessToken");

    // 1. Check Login
    if (!token) {
      toast.error("Login Required 🔒", {
        description: "Please sign in to complete your delicious order.",
        duration: 4000,
        action: {
          label: "Login Now",
          onClick: () => router.push("/login"),
        },
      });
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // 2. Format data for Backend
      const orderData = {
        items: items.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
      };

      // 3. Send Request to Your Backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        toast.success("Order Placed Successfully! 🚀", {
          description: "The kitchen has received your order.",
          duration: 4000,
          action: {
            label: "View Status",
            onClick: () => router.push("/dashboard"),
          },
        });
      } else {
        toast.error("Order Failed", {
          description: data.message || "We couldn't process your order.",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection Error", {
        description: "Something went wrong connecting to the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      {/* THE TRIGGER BUTTON (Visible in Navbar) */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
            {cartCount}
          </span>
        </Button>
      </SheetTrigger>

      {/* THE DRAWER CONTENT (Hidden until clicked) */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 mt-8 h-[70vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground flex flex-col items-center gap-4 mt-10">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-dashed pb-4"
              >
                <div className="flex gap-3">
                  {/* Item Details */}
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} x{" "}
                      <span className="text-primary font-bold">
                        ${item.price}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {items.length > 0 && (
          <div className="mt-auto border-t pt-6">
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total:</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              className="w-full font-bold text-lg py-6"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout Now 🚀"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
