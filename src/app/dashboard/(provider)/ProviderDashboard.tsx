// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/shared/Navbar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useRouter } from "next/navigation";
// import { CheckCircle, Truck } from "lucide-react";

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: number;
//   user: { name: string; email: string }; // We need to know WHO ordered
//   orderItems: any[];
// }

// export default function UserDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const router = useRouter();

//   // 1. Fetch ALL Orders (Backend allows Providers to see all)
//   const fetchOrders = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//         router.push("/login");
//         return;
//     }

//     const res = await fetch("http://localhost:5000/api/orders", {
//       headers: { Authorization: token },
//     });
//     const data = await res.json();
//     if (data.success) setOrders(data.data);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 2. Function to Update Status
//   const updateStatus = async (orderId: string, newStatus: string) => {
//     const token = localStorage.getItem("accessToken");

//     if(!token) return;

//     const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token
//       },
//       body: JSON.stringify({ status: newStatus }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert(`Order marked as ${newStatus}!`);
//       fetchOrders(); // Refresh list
//     } else {
//       alert("Failed: " + data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-8">Provider <span className="text-primary">Dashboard</span></h1>

//         <div className="grid gap-6">
//           {orders.map((order) => (
//             <Card key={order.id}>
//               <CardHeader className="flex flex-row items-center justify-between bg-white border-b py-4">
//                 <div>
//                   <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
//                   <p className="text-sm text-gray-500">Customer: {order.user?.name} ({order.user?.email})</p>
//                 </div>
//                 <Badge className="text-sm">{order.status}</Badge>
//               </CardHeader>

//               <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
//                 <div className="text-lg font-bold">
//                    Total: ${order.totalPrice.toFixed(2)}
//                    <span className="text-xs font-normal text-gray-500 ml-2">({order.orderItems.length} items)</span>
//                 </div>

//                 {/* ACTION BUTTONS */}
//                 <div className="flex gap-3">
//                   {order.status === "PENDING" && (
//                     <Button
//                         className="bg-blue-600 hover:bg-blue-700"
//                         onClick={() => updateStatus(order.id, "IN_PROGRESS")}
//                     >
//                       <CheckCircle className="w-4 h-4 mr-2" /> Accept Order
//                     </Button>
//                   )}

//                   {order.status === "IN_PROGRESS" && (
//                     <Button
//                         className="bg-green-600 hover:bg-green-700"
//                         onClick={() => updateStatus(order.id, "DELIVERED")}
//                     >
//                       <Truck className="w-4 h-4 mr-2" /> Mark Delivered
//                     </Button>
//                   )}

//                   {order.status === "DELIVERED" && (
//                      <span className="text-green-600 font-bold flex items-center">
//                        <CheckCircle className="w-4 h-4 mr-2" /> Completed
//                      </span>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  User,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function ProviderDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();
  const { user } = useAuth();

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
    if (user) fetchOrders();
  }, [user]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const res = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ status: newStatus }),
      },
    );
    const data = await res.json();
    if (data.success) fetchOrders();
  };

  // Stats Calculations
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Provider <span className="text-primary">Dashboard</span>
            </h1>
            {/* <h1 className="text-3xl font-bold mb-8">
              {user?.providerProfile?.category?.[0]}
              <span className="text-primary">Orders Management</span>
            </h1> */}
            <p className="text-slate-500">
              Manage your restaurant operations and track sales.
            </p>
          </div>
          <Button className="bg-primary hover:bg-orange-600 shadow-lg shadow-orange-200">
            <Utensils className="mr-2 h-4 w-4" /> Add New Meal
          </Button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Revenue
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

        <h2 className="text-xl font-bold mb-4 text-slate-800">Recent Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="bg-slate-50 p-6 flex flex-col justify-center border-r border-slate-100 min-w-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Order ID
                  </span>
                  <span className="font-mono font-bold text-slate-700">
                    #{order.id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {order.user?.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {order.user?.email}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        variant={
                          order.status === "DELIVERED" ? "secondary" : "outline"
                        }
                        className="rounded-full"
                      >
                        {order.status}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {order.orderItems.length} items ordered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase font-bold">
                        Total Price
                      </p>
                      <p className="text-xl font-black text-primary">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {order.status === "PENDING" && (
                        <Button
                          onClick={() => updateStatus(order.id, "IN_PROGRESS")}
                          className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100"
                        >
                          Accept
                        </Button>
                      )}
                      {order.status === "IN_PROGRESS" && (
                        <Button
                          onClick={() => updateStatus(order.id, "DELIVERED")}
                          className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-100"
                        >
                          <Truck className="w-4 h-4 mr-2" /> Dispatch
                        </Button>
                      )}
                      {order.status === "DELIVERED" && (
                        <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">
                          <CheckCircle className="w-4 h-4 mr-2" /> Complete
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
