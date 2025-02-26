"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Card } from "../ui/card";
import { ArrowRight, Car, Loader2 } from "lucide-react";
import UserDashboardInfo from "./UserDashboardInfo";
import { useGetCurrentSubscription } from "@/hooks/subscription.hooks";
import { Button } from "../ui/button";
import { useUser } from "@/lib/user.provider";
import { useCustomerPortal } from "@/hooks/payment.hooks";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const UserLayout = () => {
  const { data } = useGetCurrentSubscription();
  const pathname = usePathname();
  const { id } = useParams();
  const { user } = useUser();
  const { mutate, isPending } = useCustomerPortal();

  const activeSubscription = data?.data?.varient || "No Active Subscription";

  const handleGoToCustomerPortal = async () => {
    mutate(
      { email: user?.email as string },
      {
        onSuccess: (data) => {
          toast({
            title: data?.success ? "Sucessfull" : "Failed",
            description: data?.message,
            variant: data?.success ? "default" : "destructive",
          });
          if (data?.success) {
            window.open(data?.data?.redirectUrl, "_blank");
          }
        },
      }
    );
  };

  return pathname.includes("/account") || pathname.includes(id as string) ? (
    ""
  ) : (
    <div>
      <div>
        <UserDashboardInfo />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-4 md:p-6 bg-gradient-radial from-burgundy to-burgundy/90 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80">Active Subscription</p>
              <p className="text-xl md:text-2xl font-bold mt-1">
                {activeSubscription}
              </p>
              <Link
                href={
                  data?.data
                    ? `/my-subscription/${data?.data?._id}`
                    : "/subscribes"
                }
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4 bg-white/10 hover:bg-white/20 text-white"
                >
                  View {data?.data ? "Details" : "Cars"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Car className="h-12 w-12 text-white/80" />
          </div>
        </Card>

        {/* Payment Card */}
        <Card className="p-4 md:p-6 bg-gradient-radial text-white from-blue-500 to-blue-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm">Payments</p>
              <p className="text-xl md:text-2xl font-bold">
                Manage your payment account
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 bg-burgundy hover:bg-burgundy/90 text-white"
                onClick={handleGoToCustomerPortal}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Payment Portal"
                )}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Image
              width={500}
              height={500}
              src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Powered-by-Stripe-Logo.wine.svg"
              alt="Stripe Logo"
              className="h-32 w-32 mt-[-30px]"
            />
          </div>
        </Card>

        {/* Insurance Card */}
        <Card className="p-4 md:p-6 text-white bg-[#19282D]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Insurance</p>
              <p className="text-xl md:text-2xl font-bold mt-1">
                Need to file a claim? Scan the QR code
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 bg-burgundy hover:bg-burgundy/90 text-white"
                onClick={() =>
                  window.open("https://dashboard.stripe.com/login", "_blank")
                }
              >
                Insurance Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Image
              width={500}
              height={500}
              src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
              alt="QR Logo"
              className="md:h-32 md:w-32 w-24 h-24"
            />
          </div>
        </Card>
      </div>

      <div className="py-1.5 hidden lg:inline-block border-b">
        <Link
          href="/dashboard/my-subscription"
          className={`${
            pathname === "/dashboard/my-subscription" &&
            "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          My Subscription
        </Link>
        <Link
          href="/dashboard/subscription-request"
          className={`${
            pathname === "/dashboard/subscription-request" &&
            "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Subscription Request
        </Link>
        <Link
          href="/dashboard/support"
          className={`${
            pathname === "/dashboard/support" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Support
        </Link>
        <Link
          href="/dashboard/insurance"
          className={`${
            pathname === "/dashboard/insurance" && "bg-burgundy text-white"
          } px-3 py-1.5`}
        >
          Insurance
        </Link>
      </div>
    </div>
  );
};

export default UserLayout;
