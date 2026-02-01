"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Truck,
  Utensils,
  DollarSign,
  ShoppingBag,
  Clock,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";

// Define the shape of the new "Split Order" data
interface OrderItem {
  id: string;
  quantity: number;
  status: string;
  meal: {
    name: string;
    price: number;
    category: { name: string };
  };
}

interface ProviderOrder {
  orderId: string;
  customerName: string;
  status: string;
  createdAt: string;
  totalRevenue: number;
  items: OrderItem[];
}

export default function ProviderDashboard() {
  const [orders, setOrders] = useState<ProviderOrder[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // 1. Fetch Orders from the NEW Provider Endpoint
  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // CHANGED: Now fetching from the "split" endpoint
      const res = await fetch(
        "http://localhost:5000/api/orders/provider-orders",
        {
          headers: { Authorization: token },
        },
      );
      const data = await res.json();

      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  // 2. Status Update (Still uses the main Order ID)
  const updateStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();
      if (data.success) {
        fetchOrders(); // Refresh to show new status
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 3. Stats Calculations (Updated for new data structure)
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Provider <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-slate-500">
              Manage your restaurant operations and track sales.
            </p>
          </div>
          <Button className="bg-primary hover:bg-orange-600 shadow-lg shadow-orange-200">
            <Utensils className="mr-2 h-4 w-4" /> Add New Meal
          </Button>
        </div>

        {/* QUICK STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Revenue Card */}
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    My Revenue
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    ${totalRevenue.toFixed(2)}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <DollarSign />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Count Card */}
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Orders Received
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {orders.length}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <ShoppingBag />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Action Card */}
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending Actions
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {pendingOrders}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Clock />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RECENT ORDERS LIST */}
        <h2 className="text-xl font-bold mb-4 text-slate-800">Recent Orders</h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed">
              <p className="text-gray-500">
                No orders found for your category yet.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const currentStatus = order.items[0]?.status || "PENDING";
              return (
                <Card
                  key={order.orderId}
                  className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row items-stretch">
                    {/* Left Side: Order ID */}
                    <div className="bg-slate-50 p-6 flex flex-col justify-center border-r border-slate-100 min-w-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Order ID
                      </span>
                      <span className="font-mono font-bold text-slate-700">
                        #{order.orderId.slice(0, 8).toUpperCase()}
                      </span>
                    </div>

                    {/* Right Side: Order Details */}
                    <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      {/* Customer Info */}
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {order.customerName}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              currentStatus === "DELIVERED"
                                ? "secondary"
                                : "outline"
                            }
                            className="rounded-full"
                          >
                            {currentStatus}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {order.items.length} items for you
                          </span>
                        </div>

                        {/* NEW: List the specific items for this provider */}
                        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-2">
                              <span className="font-bold">
                                {item.quantity}x
                              </span>
                              <span>{item.meal.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col items-end gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-400 uppercase font-bold">
                            Your Revenue
                          </p>
                          <p className="text-xl font-black text-primary">
                            ${order.totalRevenue.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {currentStatus === "PENDING" && (
                            <Button
                              onClick={() =>
                                updateStatus(order.orderId, "IN_PROGRESS")
                              }
                              className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100"
                            >
                              Accept
                            </Button>
                          )}
                          {currentStatus === "IN_PROGRESS" && (
                            <Button
                              onClick={() =>
                                updateStatus(order.orderId, "DELIVERED")
                              }
                              className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-100"
                            >
                              <Truck className="w-4 h-4 mr-2" /> Dispatch
                            </Button>
                          )}
                          {currentStatus === "DELIVERED" && (
                            <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">
                              <CheckCircle className="w-4 h-4 mr-2" /> Complete
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
