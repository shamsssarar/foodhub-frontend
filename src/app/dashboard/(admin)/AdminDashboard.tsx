"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trash2,
  Shield,
  Users,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Truck,
  XCircle,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- DATA FETCHING ---
  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // 1. Fetch Users (You need this route in backend!)
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        headers: { Authorization: token },
      });
      const userData = await userRes.json();
      if (userData.success) setUsers(userData.data);

      // 2. Fetch Orders
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders`,
        {
          headers: { Authorization: token },
        },
      );
      const orderData = await orderRes.json();
      if (orderData.success) setOrders(orderData.data);
      const catRes = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      );
      const catData = await catRes.json();
      if (catData.success) setCategories(catData.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    )
      return;

    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: token! },
      },
    );
    const data = await res.json();
    if (data.success) {
      alert("User deleted successfully");
      fetchData(); // Refresh
    } else {
      alert(data.message);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order completely?")) return;

    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: { Authorization: token! },
      },
    );
    const data = await res.json();
    if (data.success) {
      alert("Order deleted");
      fetchData();
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token! },
        body: JSON.stringify({ status: newStatus }),
      },
    );
    if (res.ok) fetchData();
  };

  // const handleAssignCategory = async (
  //   userId: string,
  //   requestedCuisine: string,
  // ) => {
  //   // 1. Show available categories in the prompt
  //   const catList = categories.map((c) => `• ${c.name}`).join("\n");

  //   const selectedName = prompt(
  //     `User Requested: "${requestedCuisine}"\n\nType the EXACT Category Name to assign:\n${catList}`,
  //   );

  //   if (!selectedName) return; // Cancelled

  //   // 2. Find the Category ID based on name
  //   const category = categories.find(
  //     (c) => c.name.toLowerCase() === selectedName.trim().toLowerCase(),
  //   );

  //   if (!category) {
  //     toast.error("Category not found! Check spelling or create it first.");
  //     return;
  //   }

  //   // 3. Send to Backend
  //   const token = localStorage.getItem("accessToken");
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/assign-category`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token!,
  //         },
  //         body: JSON.stringify({ categoryId: category.id }),
  //       },
  //     );

  //     const data = await res.json();

  //     if (data.success) {
  //       toast.success(`Assigned to ${category.name} & Approved! 🚀`);
  //       fetchData(); // Refresh list
  //     } else {
  //       toast.error(data.message || "Failed to assign");
  //     }
  //   } catch (err) {
  //     toast.error("Something went wrong");
  //   }
  // };




  // --- CALCULATIONS ---
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Admin <span className="text-primary">Portal</span>
            </h1>
            <p className="text-slate-500">
              Master control over users and orders.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2">
            <Shield className="text-primary h-5 w-5" />
            <span className="font-bold text-slate-700">Super Admin Mode</span>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Users
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {users.length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {orders.length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <ShoppingBag />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Platform Revenue
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  ${totalRevenue.toFixed(2)}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <DollarSign />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ADD CATEGORY BUTTON */}
            <Card
              className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary group bg-white"
              onClick={() => router.push("/dashboard/add-category")}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                  Add Category
                </CardTitle>
                <Layers className="w-5 h-5 text-slate-400 group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Create new cuisine types for providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* MAIN TABS */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="orders" className="text-md">
              Manage Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="text-md">
              Manage Users
            </TabsTrigger>
          </TabsList>

          {/* === ORDERS TAB === */}
          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left: Info */}
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <Badge
                            variant={
                              order.status === "DELIVERED"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          Customer:{" "}
                          <span className="font-medium text-slate-900">
                            {order.user?.name}
                          </span>{" "}
                          ({order.user?.email})
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.orderItems.length} items
                        </p>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mr-auto">
                        Actions:
                      </p>

                      {/* Status Buttons */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "PENDING")}
                        className="h-8"
                      >
                        Pending
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateOrderStatus(order.id, "IN_PROGRESS")
                        }
                        className="h-8 text-blue-600 border-blue-200 bg-blue-50"
                      >
                        In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                        className="h-8 text-green-600 border-green-200 bg-green-50"
                      >
                        Delivered
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                        className="h-8 text-orange-600 border-orange-200 bg-orange-50"
                      >
                        Cancel
                      </Button>

                      {/* Delete Button */}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 ml-4"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* === USERS TAB === */}

          <TabsContent value="users">
            <Card className="border-none shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Info</TableHead>
                    <TableHead>Role</TableHead>
                    {/* 🟢 NEW COLUMN */}
                    <TableHead>Cuisine Request</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            u.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : ""
                          }
                        >
                          {u.role}
                        </Badge>
                      </TableCell>

                      {/* 🟢 NEW: SHOW REQUESTED CUISINE */}
                      <TableCell>
                        {u.role === "PROVIDER" ? (
                          <div className="flex flex-col gap-2">
                            {/* 1. Show the Requested Cuisine Name */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700">
                                {u.providerProfile?.cuisineType ||
                                  "No Type Selected"}
                              </span>
                            </div>

                            {/* 2. Show Status Badge */}
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  u.providerProfile?.status === "APPROVED"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {u.providerProfile?.status || "PENDING"}
                              </Badge>

                              {/* 3. Show Assign Button (Only if Pending) */}
                              {u.providerProfile?.status === "PENDING" && (
                                <Button
                                  size="sm"
                                  className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                                  onClick={() => router.push(`/dashboard/assign-category/${u.id}`)}
                                >
                                  Assign Category
                                </Button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
