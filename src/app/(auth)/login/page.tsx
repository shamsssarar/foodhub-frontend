"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

// 1. Define the Validation Schema (Must match backend!)
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  // 2. Setup Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Handle Submit
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Call your Backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Login failed");
      }

      // Success! Save token and redirect

      if (result.success) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("userName", result.data.user.name);
        localStorage.setItem("userRole", result.data.user.role);
        setUser({
          name: result.data.user.name,
          role: result.data.user.role,
        });
      }
      toast.success("Welcome back, Foodie🍗", {
        description: "You have successfully logged in.",
        duration: 2000,
      });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Login Failed", {
        description: err.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">

      {/* --- NEW: BACK TO HOME BUTTON --- */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/">
          <Button variant="ghost" className="hover:bg-orange-100 text-orange-800 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      {/* -------------------------------- */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Login to continue your food journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
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

          <Button
            type="submit"
            className="w-full text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
