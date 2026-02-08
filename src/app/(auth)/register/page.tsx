"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

// 1. Validation Schema - Added 'cuisine'
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
  cuisine: z.string().optional(), // Optional initially, validated manually below if Provider
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// List of Food Categories your app supports
const CUISINE_TYPES = [
  "Burger",
  "Pizza",
  "Pasta",
  "Dessert",
  "Chicken",
  "Beverages",
  "Sushi",
  "Biriyani",
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch, // <--- Added watch to track role changes
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  // Watch the role field in real-time
  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError("");

    // Custom Validation: If Provider, Cuisine is required
    if (data.role === "PROVIDER" && !data.cuisine) {
      setError("Please select a Cuisine Type for your restaurant");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Account Created! 👨‍🍳", {
        description: "Please login to access your dashboard.",
        duration: 3000,
      });
      router.push("/login");
    } catch (err: any) {
      toast.error("Registration Failed", {
        description: err.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/">
          <Button
            variant="ghost"
            className="hover:bg-orange-100 text-orange-800 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">Join FoodHub today</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label>I want to...</Label>
            <Select
              onValueChange={(val) =>
                setValue("role", val as "CUSTOMER" | "PROVIDER")
              }
              defaultValue="CUSTOMER"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">Order Food (Customer)</SelectItem>
                <SelectItem value="PROVIDER">Sell Food (Provider)</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("role")} />
          </div>

          {/* 🟢 RESTORED: Dropdown for Cuisine Type */}
          {selectedRole === "PROVIDER" && (
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type Request</Label>
              <Input
                id="cuisine"
                placeholder="What do you want to sell? (e.g. Tacos, Sushi)"
                {...register("cuisine", {
                  required: "Cuisine request is required",
                })}
              />
              <p className="text-xs text-slate-500">
                Admin will review this request and assign you a category.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full font-bold mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
