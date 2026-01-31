"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { jwtDecode } from "jwt-decode";
import { error } from "console";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  meal: {
    name: string;
    imageUrl: string | null;
  };
}

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {

        const decoded: any = jwtDecode(token);

        const userId = decoded.userId;

        if (!userId) {
          console.error("User ID not found in token");
          return;
        }

        setLoading(true);

        // 3. Use the local userId variable directly in the URL
        const res = await fetch(
          `http://localhost:5000/api/orders/user/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">
          My <span className="text-primary">Orders</span>
        </h1>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <h3 className="text-xl font-bold text-gray-400">
              No orders found 📦
            </h3>
            <p className="text-muted-foreground mt-2">
              Go to the menu and eat something!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-white border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Order ID: {order.id}
                      </p>
                      <p className="text-sm font-bold text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === "PENDING" ? "secondary" : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                            {/* Optional: Add Image tag here if you want */}
                            <img
                              src={item.meal?.imageUrl || "/placeholder.png"}
                              className="object-cover h-full w-full opacity-80"
                            />
                          </div>
                          <div>
                            <p className="font-bold">{item.meal?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total Paid</span>
                    <span className="font-bold text-xl text-primary">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
