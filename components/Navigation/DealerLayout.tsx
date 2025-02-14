"use client";
import { Card } from "@/components/ui/card";
import { Car, Clock, FileText, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetDealerDashboardData } from "@/hooks/subscription.hooks";
import { Skeleton } from "@/components/ui/skeleton";

const DealerLayout = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const { data, isLoading } = useGetDealerDashboardData();

  // Conditional rendering for specific paths
  if (
    pathname.includes("/inventory/add") ||
    pathname.includes(id as string) ||
    pathname.includes("/account")
  ) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Dealer Dashboard</h1>
        <Link href="/dealer/account">
          <div className="space-x-2">
            <Button variant="outline" className="mr-2">
              <UserCircle2 className="mr-2 h-4 w-4" />
              Account
            </Button>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </Card>
            ))
        ) : (
          <>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Car className="h-8 w-8 text-burgundy" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Inventory
                  </p>
                  <p className="text-2xl font-bold">
                    {data?.data?.activeInventory}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-burgundy" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Fulfillment
                  </p>
                  <p className="text-2xl font-bold">
                    {data?.data?.pendingFulfillment}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-burgundy" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Subscriptions
                  </p>
                  <p className="text-2xl font-bold">
                    {data?.data?.activeSubscription}
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <div className="py-1.5 hidden lg:inline-block border-b">
        <Link
          href="/dealer/inventory"
          className={`${
            pathname === "/dealer/inventory" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Inventory
        </Link>
        <Link
          href="/dealer/fulfillment"
          className={`${
            pathname === "/dealer/fulfillment" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Fulfillment
        </Link>
        <Link
          href="/dealer/subscriptions"
          className={`${
            pathname === "/dealer/subscriptions" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Subscriptions
        </Link>
        <Link
          href="/dealer/support"
          className={`${
            pathname === "/dealer/support" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Support
        </Link>
      </div>
    </>
  );
};

export default DealerLayout;
