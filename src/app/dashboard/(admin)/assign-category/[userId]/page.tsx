"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ChefHat, 
  UtensilsCrossed, 
  CheckCircle2, 
  Plus, 
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AssignCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  const [provider, setProvider] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        // A. Get Provider Details
        // (Assuming you have an endpoint for single user, or filtering from list)
        // For efficiency, we reuse the list endpoint but filtered, 
        // OR you can create a specific endpoint. 
        // Here we just fetch all users and find the one (simplest for now):
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            headers: { Authorization: token! }
        });
        const userData = await userRes.json();
        const foundUser = userData.data.find((u: any) => u.id === userId);
        setProvider(foundUser);

        // B. Get Categories
        const catRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
        const catData = await catRes.json();
        setCategories(catData.data || []);

      } catch (err) {
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [userId]);

  // --- 2. Handle Assign ---
  const handleConfirm = async () => {
    if (!selectedCatId) return;
    setAssigning(true);
    const token = localStorage.getItem("accessToken");

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/assign-category`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                Authorization: token! 
            },
            body: JSON.stringify({ categoryId: selectedCatId }),
        });
        
        const data = await res.json();
        if(data.success) {
            toast.success("Provider Officially Assigned! 👨‍🍳✅");
            router.push("/dashboard"); // Go back to dashboard
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        toast.error("Assignment failed");
    } finally {
        setAssigning(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Chef's Table...</div>;
  if (!provider) return <div className="p-10 text-center">Provider not found</div>;

  // Filter categories by search
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/50 p-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-3xl mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="hover:bg-amber-100 text-amber-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>

      <div className="w-full max-w-3xl grid gap-6">
        
        {/* --- CARD 1: THE REQUEST --- */}
        <Card className="border-none shadow-xl bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-full text-primary">
                        <ChefHat className="w-8 h-8" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-slate-800">
                           Approve {provider.name}'s Kitchen
                        </CardTitle>
                        <p className="text-slate-500 text-sm">{provider.email}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        They Requested Cuisine
                    </p>
                    <h2 className="text-4xl font-black text-primary font-serif">
                        "{provider.providerProfile?.cuisineType}"
                    </h2>
                </div>
            </CardContent>
        </Card>

        {/* --- CARD 2: SELECT CATEGORY --- */}
        <Card className="border-none shadow-lg bg-white">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Select Official Category</span>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Find cuisine..." 
                            className="pl-9 bg-slate-50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                
                {/* CATEGORY GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredCategories.map((cat) => (
                        <div 
                            key={cat.id}
                            onClick={() => setSelectedCatId(cat.id)}
                            className={`
                                cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 border-2 transition-all duration-200
                                ${selectedCatId === cat.id 
                                    ? "border-primary bg-orange-50 text-primary shadow-md scale-105" 
                                    : "border-slate-100 bg-white hover:border-orange-200 hover:shadow-sm text-slate-600"
                                }
                            `}
                        >
                            {/* You can add dynamic icons here later based on name if you want */}
                            <UtensilsCrossed className={`w-6 h-6 ${selectedCatId === cat.id ? "opacity-100" : "opacity-30"}`} />
                            <span className="font-bold text-sm text-center">{cat.name}</span>
                            {selectedCatId === cat.id && <CheckCircle2 className="w-4 h-4 text-primary absolute top-2 right-2" />}
                        </div>
                    ))}

                    {/* CREATE NEW BUTTON */}
                    <div 
                         onClick={() => router.push("/dashboard/add-category")}
                         className="cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary hover:text-primary hover:bg-orange-50 transition-all"
                    >
                        <Plus className="w-8 h-8" />
                        <span className="font-medium text-sm">Create New</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <Button variant="outline" onClick={() => router.back()} className="h-12 px-6">
                        Cancel
                    </Button>
                    <Button 
                        disabled={!selectedCatId || assigning}
                        onClick={handleConfirm}
                        className="h-12 px-8 bg-primary hover:bg-orange-600 text-lg font-bold shadow-lg shadow-orange-200"
                    >
                        {assigning ? "Assigning..." : "Confirm & Approve Provider"}
                    </Button>
                </div>

            </CardContent>
        </Card>

      </div>
    </div>
  );
}