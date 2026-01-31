"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function UserDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    setOrders([]);

    const fetchMyOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const decoded: any = jwtDecode(token);

      const userId = decoded.userId;
      const res = await fetch(
        `http://localhost:5000/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      const data = await res.json();
      if (data.success) setOrders(data.data);
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, <span className="text-primary">Foodie!</span>
          </h1>
          <p className="text-slate-500">
            Track your current cravings and past delights.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Activity Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="text-primary" /> Order History
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No orders yet. Ready to eat?</p>
              </div>
            ) : (
              orders.map((order) => (
                <Card
                  key={order.id}
                  className="border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary font-bold">
                        {order.orderItems.length}
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">
                          Order #{order.id.slice(-5).toUpperCase()}
                        </p>
                        <h4 className="font-bold text-slate-800">
                          Total Paid: ${order.totalPrice}
                        </h4>
                      </div>
                    </div>
                    <Badge
                      className={`${order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"} border-none px-4 py-1`}
                    >
                      {order.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Rewards Points</h3>
                  <p className="text-3xl font-black text-primary">450 pts</p>
                  <p className="text-xs text-slate-400 mt-4">
                    Order 2 more times to get a free delivery!
                  </p>
                </div>
                <Star className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12" />
              </CardContent>
            </Card>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-primary" /> Default Address
              </h3>
              <p className="text-sm text-slate-600">
                123 Foodie Lane, Flavor Town, FT 50505
              </p>
              <Button variant="link" className="p-0 h-auto text-primary mt-2">
                Edit Address
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
