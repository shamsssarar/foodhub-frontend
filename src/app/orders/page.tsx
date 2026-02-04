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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, LogOut, UserPlus, Clock, CheckCircle } from "lucide-react";
import ReviewModal from "@/components/shared/ReviewModal";

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
  reviews?: {
    mealId: string;
    rating: number;
  }[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("userRole");

    if (!token) {
      window.location.replace("/login");
      return;
    }
    
    if (storedRole) setUserRole(storedRole);

    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.userId;

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }

      // setLoading(true); // Optional: be careful with loading state on re-fetches to avoid flickering

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders/user/${userId}`,
        {
          headers: { Authorization: token },
        }
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

  // 🟢 2. CALL IT HERE (On Page Load)
  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        {userRole === "PROVIDER" ? null : (
          <h1 className="text-3xl font-bold mb-8">
            My <span className="text-primary">Orders</span>
          </h1>
        )}
        {loading ? (
          <Loading />
        ) : userRole === "PROVIDER" ? (
          <>
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-dashed border-orange-200 shadow-sm max-w-2xl mx-auto px-6 animate-in fade-in zoom-in duration-500">
              <div className="bg-orange-100 p-5 rounded-full mb-6 shadow-inner">
                <ChefHat className="h-12 w-12 text-primary" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Time to Eat, Chef? 👨‍🍳
              </h3>

              <p className="text-gray-500 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                You are currently in{" "}
                <span className="font-bold text-primary">Provider Mode</span>{" "}
                managing your restaurant.
                <br className="hidden sm:block" />
                To explore the menu and order delicious food for yourself,
                please switch to a <strong>Customer Account</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                {/* Button 1: Logout & Login */}
                <Button
                  size="lg"
                  className="font-bold px-8 h-12 shadow-lg shadow-orange-100 hover:scale-105 transition-transform"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Login as Customer
                </Button>

                {/* Button 2: Register */}
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-bold px-8 h-12 border-2 border-primary text-primary hover:bg-orange-50 w-full sm:w-auto"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join as New Foodie
                  </Button>
                </Link>
              </div>
            </div>

            {/* 2. THE CONFIRMATION POPUP (MODAL) */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100">
                  {/* Icon & Title */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full mb-4">
                      <LogOut className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Switching Accounts?
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Are you sure you want to log out of your Provider account?
                      You will need to sign in again to manage your restaurant.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 font-bold border-gray-200"
                      onClick={() => setShowLogoutConfirm(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="flex-1 font-bold bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        // 3. ACTUAL LOGOUT LOGIC HERE
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userRole");
                        window.location.href = "/login";
                      }}
                    >
                      Yes, Log me out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : orders.length === 0 ? (
          <>
            <div className="text-center py-20 bg-white rounded-xl border">
              <p className="text-muted-foreground m-2">
                Go to the menu and eat something!
              </p>
              <Link href="/meals">
                <Button size="lg" className="font-bold px-8 ">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </>
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
                    {order.orderItems.map((item: any) => {
                      const hasReviewed = order.reviews?.some(
                        (r: any) => r.mealId === item.meal.id,
                      );
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            {/* Item Image */}
                            <div className="h-14 w-14 bg-gray-100 rounded-md overflow-hidden relative">
                              <img
                                src={item.meal?.imageUrl || "/placeholder.png"}
                                alt={item.meal?.name}
                                className="object-cover h-full w-full"
                              />
                            </div>

                            {/* Item Name & Status */}
                            <div>
                              <p className="font-bold text-gray-800">
                                {item.meal?.name}
                              </p>

                              {/* --- NEW STATUS BADGE FOR EACH ITEM --- */}
                              <div className="mt-1">
                                {item.status === "PENDING" && (
                                  <span className="inline-flex items-center text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                    <Clock className="w-3 h-3 mr-1" /> Pending
                                  </span>
                                )}
                                {item.status === "IN_PROGRESS" && (
                                  <span className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                    <ChefHat className="w-3 h-3 mr-1" /> Cooking
                                  </span>
                                )}
                                {item.status === "DELIVERED" && (
                                  <span className="inline-flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                    <CheckCircle className="w-3 h-3 mr-1" />{" "}
                                    Ready
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Price & Quantity */}
                          <div className="text-right flex flex-col items-end gap-2">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                              <p className="font-bold text-primary">
                                ${(item.meal.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            {/* 🟢 NEW: Review Button (Only appears if Delivered) */}
                            {item.status === "DELIVERED" &&
                              (hasReviewed ? (
                                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                                  ★ Review Submitted
                                </span>
                              ) : (
                                <ReviewModal
                                  mealId={item.meal.id}
                                  mealName={item.meal.name}
                                  orderId={order.id}
                                  onReviewSuccess={fetchOrders}
                                />
                              ))}
                          </div>
                        </div>
                      );
                    })}
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
