"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CheckCircle, Truck } from "lucide-react";

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  user: { name: string; email: string }; // We need to know WHO ordered
  orderItems: any[];
}

export default function UserDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  // 1. Fetch ALL Orders (Backend allows Providers to see all)
  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        router.push("/login");
        return;
    }

    const res = await fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (data.success) setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Function to Update Status
  const updateStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("accessToken");

    if(!token) return;
    
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token 
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    
    if (data.success) {
      alert(`Order marked as ${newStatus}!`);
      fetchOrders(); // Refresh list
    } else {
      alert("Failed: " + data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Provider <span className="text-primary">Dashboard</span></h1>
        
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between bg-white border-b py-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-500">Customer: {order.user?.name} ({order.user?.email})</p>
                </div>
                <Badge className="text-sm">{order.status}</Badge>
              </CardHeader>
              
              <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-lg font-bold">
                   Total: ${order.totalPrice.toFixed(2)}
                   <span className="text-xs font-normal text-gray-500 ml-2">({order.orderItems.length} items)</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">
                  {order.status === "PENDING" && (
                    <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateStatus(order.id, "IN_PROGRESS")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Accept Order
                    </Button>
                  )}
                  
                  {order.status === "IN_PROGRESS" && (
                    <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateStatus(order.id, "DELIVERED")}
                    >
                      <Truck className="w-4 h-4 mr-2" /> Mark Delivered
                    </Button>
                  )}
                  
                  {order.status === "DELIVERED" && (
                     <span className="text-green-600 font-bold flex items-center">
                       <CheckCircle className="w-4 h-4 mr-2" /> Completed
                     </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}