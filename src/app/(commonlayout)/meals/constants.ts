export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: { name: string };
  imageUrl: string | null;
}

export const DEFAULT_MEALS: Meal[] = [
  // --- BURGERS ---
  {
    id: "default-1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.",
    price: 12.99,
    category: { name: "Burger" },
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
  },
  {
    id: "default-7",
    name: "BBQ Bacon Smokehouse",
    description: "Double patty topped with crispy bacon, onion rings, and smoky BBQ sauce.",
    price: 14.99,
    category: { name: "Burger" },
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop",
  },
  {
    id: "default-8",
    name: "Mushroom Swiss Burger",
    description: "Savory sautéed mushrooms and melted Swiss cheese on a brioche bun.",
    price: 13.50,
    category: { name: "Burger" },
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop",
  },

  // --- PIZZA ---
  {
    id: "default-2",
    name: "Pepperoni Pizza",
    description: "Crispy crust topped with zesty tomato sauce, mozzarella, and spicy pepperoni.",
    price: 15.50,
    category: { name: "Pizza" },
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop",
  },
  {
    id: "default-9",
    name: "Margherita Basil",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and aromatic basil leaves.",
    price: 13.00,
    category: { name: "Pizza" },
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop",
  },
  {
    id: "default-10",
    name: "BBQ Chicken Supreme",
    description: "Grilled chicken, red onions, and cilantro on a tangy BBQ sauce base.",
    price: 16.99,
    category: { name: "Pizza" },
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
  },

  // --- SUSHI ---
  {
    id: "default-3",
    name: "Dragon Sushi Roll",
    description: "Fresh salmon and avocado roll topped with spicy mayo and eel sauce.",
    price: 18.00,
    category: { name: "Sushi" },
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
  },
  {
    id: "default-11",
    name: "Spicy Tuna Crunch",
    description: "Spicy tuna filling with cucumber, topped with crunchy tempura flakes.",
    price: 16.50,
    category: { name: "Sushi" },
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop",
  },
  {
    id: "default-12",
    name: "Salmon Nigiri Platter",
    description: "Premium slices of fresh salmon served over perfectly seasoned sushi rice.",
    price: 22.00,
    category: { name: "Sushi" },
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop",
  },

  // --- HEALTHY ---
  {
    id: "default-4",
    name: "Grilled Chicken Salad",
    description: "Healthy greens with grilled chicken breast, cherry tomatoes, and balsamic vinaigrette.",
    price: 11.00,
    category: { name: "Healthy" },
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
  },
  {
    id: "default-13",
    name: "Quinoa Power Bowl",
    description: "Nutrient-packed bowl with quinoa, avocado, chickpeas, and roasted sweet potato.",
    price: 12.50,
    category: { name: "Healthy" },
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
  },

  // --- PASTA ---
  {
    id: "default-5",
    name: "Creamy Carbonara",
    description: "Authentic Italian pasta with egg, cheese, pancetta, and black pepper.",
    price: 14.50,
    category: { name: "Pasta" },
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
  },
  {
    id: "default-15",
    name: "Spaghetti Bolognese",
    description: "Slow-cooked beef ragu served over al dente spaghetti noodles.",
    price: 13.99,
    category: { name: "Pasta" },
    imageUrl: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&auto=format&fit=crop",
  },
  {
    id: "default-16",
    name: "Pesto Penne",
    description: "Penne pasta tossed in homemade basil pesto with cherry tomatoes and parmesan.",
    price: 12.50,
    category: { name: "Pasta" },
    imageUrl: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=800&auto=format&fit=crop",
  },

  // --- DESSERT ---
  {
    id: "default-17",
    name: "New York Cheesecake",
    description: "Creamy, rich cheesecake on a graham cracker crust with strawberry topping.",
    price: 7.50,
    category: { name: "Dessert" },
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
  },
  {
    id: "default-18",
    name: "Tiramisu Slice",
    description: "Classic Italian coffee-flavored dessert with layers of mascarpone and cocoa.",
    price: 9.00,
    category: { name: "Dessert" },
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
  },
];