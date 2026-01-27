"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define what an Item looks like
export interface CartItem {
  id: string; // Meal ID
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from LocalStorage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodhub-cart", JSON.stringify(items));
  }, [items]);

  // 1. Add Item
  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        // If exists, just increase quantity
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new, add it
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  // 2. Remove Item
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. Clear Cart
  const clearCart = () => {
    setItems([]);
  };

  // Derived Values
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook for easy access
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}