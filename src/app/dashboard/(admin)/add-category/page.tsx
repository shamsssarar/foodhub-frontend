"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Layers, PlusCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AddCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // 🪄 Live Formatter for Preview
  // This shows the admin how "moGLai" will look ("Moglai")
  const formattedPreview = name.length > 0 
    ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() 
    : "Category Name";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ 
          name: name,
          description: description 
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category Created! 🎉", {
          description: `${data.data.name} is now available for providers.`,
        });
        // Reset form
        setName("");
        setDescription("");
        router.refresh(); // Update server components if needed
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 hover:bg-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>

        <Card className="shadow-xl border-slate-200 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-slate-900 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Invent a Category</h1>
            </div>
            <p className="text-slate-300 text-sm">
              Define a new cuisine type for your entire platform.
            </p>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Italian, Mexican, Dessert"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg border-slate-300 focus:border-primary focus:ring-primary"
                  required
                />
                
                {/* Live Preview Badge */}
                {name.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-2 rounded-md border border-slate-200 w-fit">
                    <Sparkles className="w-3 h-3 text-primary" />
                    Preview: <span className="font-bold text-slate-900">{formattedPreview}</span>
                  </div>
                )}
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description <span className="text-slate-400 text-xs">(Optional)</span>
                </label>
                <Textarea
                  placeholder="Describe this cuisine (e.g. 'Spicy and savory dishes from the east')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-25 border-slate-300 focus:border-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">Creating...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" /> Create Category
                  </span>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}