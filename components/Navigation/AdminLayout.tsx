"use client";

import { Card } from "@/components/ui/card";
import { Building2, Settings, Users, Watch } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useGetAdminDashboardData } from "@/hooks/subscription.hooks";

const AdminLayout = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const { data, isLoading } = useGetAdminDashboardData();

  // Exclude specific routes from rendering this layout
  const isExcluded =
    pathname.includes("/inventory/add") || pathname.includes(id as string);

  if (isExcluded) return null;

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              </Card>
            ))
          : [
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                label: "Total Customers",
                value: data?.data?.totalCustomer,
              },
              {
                icon: <Watch className="h-8 w-8 text-primary" />,
                label: "Active Products",
                value: data?.data?.activeInventory,
              },
              {
                icon: <Building2 className="h-8 w-8 text-primary" />,
                label: "Total Dealers",
                value: data?.data?.totalDealer,
              },
              {
                icon: <Settings className="h-8 w-8 text-primary" />,
                label: "System Status",
                value: "Healthy",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4">
                  {item.icon}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div>
                </div>
              </Card>
            ))}
      </div>

      {/* Navigation Links */}
      <div className="py-1.5 hidden lg:inline-block border-b flex-wrap gap-y-5">
        {[
          { label: "Customers", href: "/admin/customers" },
          { label: "Inventory", href: "/admin/inventory" },
          { label: "Transactions", href: "/admin/transactions" },
          { label: "Subscriptions", href: "/admin/subscriptions" },
          { label: "Dealers", href: "/admin/dealers" },
          { label: "Dealer-Support", href: "/admin/dealer-support" },
          { label: "Risk Assessment", href: "/admin/risk-assessment" },
          { label: "CarCare", href: "/admin/carcare" },
          { label: "Blog", href: "/admin/blog" },
          { label: "News", href: "/admin/news" },
          { label: "Testimonials", href: "/admin/testimonials" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 mb-2 md:mb-0 rounded ${
              pathname === item.href ? "bg-primary text-white" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default AdminLayout;
