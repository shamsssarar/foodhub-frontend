"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Utensils } from "lucide-react";
import { toast } from "sonner"; // Assuming you use sonner for toasts

export default function AddMealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price), // Ensure price is a number
          // Note: We don't send 'category' or 'providerId' here.
          // The Backend extracts them from the Token/Provider Profile automatically.
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Meal created successfully!");
        router.push("/dashboard/provider"); // Go back to dashboard
      } else {
        toast.error(data.message || "Failed to create meal");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-none">
        <CardHeader className="bg-white border-b pb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Button>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Utensils className="text-primary" /> Add New Meal
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Create a new dish for your menu
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meal Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Meal Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Double Cheeseburger"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  $
                </span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-2 h-32 w-full rounded-lg overflow-hidden border">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the ingredients and taste..."
                value={formData.description}
                onChange={handleChange}
                className="min-h-25"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 text-lg py-6 shadow-lg shadow-orange-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Add to Menu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
