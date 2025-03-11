"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useGetSingleRequestsQuery } from "@/hooks/request.hooks";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDeclineRequest, useTakePayment } from "@/hooks/payment.hooks";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TransactionDetails = () => {
  const { id } = useParams();
  const { data, refetch } = useGetSingleRequestsQuery(id as string);
  const { mutate: takePayment, isPending } = useTakePayment();
  const { mutate: declineRequest, isPending: isDeclinePanding } =
    useDeclineRequest();
  const { user } = useUser();
  const route = useRouter();

  useEffect(() => {
    if (user?.role === "dealer") {
      if (data?.data?.status === "Approved") {
        route.push(`/dealer/fulfillment/${id}/preparetion`);
      }
    }
    if (user?.role === "admin") {
      if (
        data?.data?.status === "Approved" ||
        data?.data?.status === "Ready for Delivery"
      ) {
        route.push(`/admin/transactions/${id}/preparetion`);
      }
    }
  }, [route, user, data?.data?.status, id]);

  const handleDecline = () => {
    declineRequest(id as string, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Success",
            description: "The subscription request has been decline!",
          });
          route.push(`/admin/transactions/${id}/preparetion`);
        } else {
          toast({
            title: "Failed",
            description: data?.message,
            variant: "destructive",
          });
        }
        refetch();
      },
    });
  };

  const handleApproveForFulfillment = () => {
    takePayment(
      { requestId: id as string },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({
              title: "Success",
              description: data?.message,
            });
          } else {
            toast({
              title: "Failed",
              description: data?.message,
              variant: "destructive",
            });
          }
          refetch();
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Customer Details */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {data?.data?.customerInfo?.firstName}{" "}
                {data?.data?.customerInfo?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data?.data?.customerInfo?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {data?.data?.customerInfo?.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">
                {data?.data?.customerInfo?.licenseNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employment Status</p>
              <p className="font-medium">
                {data?.data?.customerInfo?.employmentStatus}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Job Title</p>
              <p className="font-medium">
                {data?.data?.customerInfo?.jobTitle}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Salary</p>
              <p className="font-medium">£{data?.data?.customerInfo?.salary}</p>
            </div>

            {user?.role === "admin" && (
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      data?.data?.score >= 80
                        ? "bg-green-100 text-green-800"
                        : data?.data?.score >= 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data?.data?.score}
                  </span>
                  <Link
                    href={`/admin/risk-assessment/${data?.data?.customerCheckId}`}
                  >
                    <Button variant="link" className="text-sm">
                      View Assessment
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Vehicle Details */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Registration</p>
              <p className="font-medium">
                {data?.data?.carId?.registrationNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{data?.data?.carId?.model}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="font-medium">{data?.data?.carId?.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Variant</p>
              <p className="font-medium">{data?.data?.carId?.variant}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Price</p>
              <p className="font-medium">£{data?.data?.carId?.price}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Term</p>
              <p className="font-medium">6 months</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dealer</p>
              <p className="font-medium">
                {data?.data?.dealerId?.firstName}{" "}
                {data?.data?.dealerId?.lastName}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions Sidebar */}
      <div className="space-y-6">
        <Card className="p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-6">Actions</h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Current Status
              </p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  data?.data?.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : data?.data?.status === "Approved for Fulfillment"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {data?.data?.status}
              </span>
            </div>

            {user?.role === "admin" && data?.data?.status === "Pending" && (
              <div className="space-y-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                      ) : (
                        "Approve for Fulfillment"
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Approve for Fulfillment
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to approve this subscription
                        request for fulfillment?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isPending}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleApproveForFulfillment}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                          "Approve"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={isPending}
                    >
                      Decline Request
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Decline Request</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please provide a reason for declining this request.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeclinePanding}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDecline}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isDeclinePanding}
                      >
                        Decline
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionDetails;
