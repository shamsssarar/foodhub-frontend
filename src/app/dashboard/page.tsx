'use client'
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";

// Add these imports to clear the red lines
import AdminDashboard from "./(admin)/AdminDashboard";
import ProviderDashboard from "./(provider)/ProviderDashboard";
import UserDashboard from "./(user)/UserDashboard";

export default function DashboardProxy() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <div className="p-10">Checking permissions...</div>;

  if (isLoading && !user) {
    router.push("/login");
    return null;
  }

  switch (user.role?.toUpperCase()) {
    case "ADMIN":
      return <AdminDashboard />;
    case "PROVIDER":
      return <ProviderDashboard />;
    case "CUSTOMER":
      return <UserDashboard />;
    default:
      return <div className="p-10">Unauthorized: Role not recognized.</div>;
  }
}
