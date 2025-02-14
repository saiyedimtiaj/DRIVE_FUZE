"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetSingleSubscription } from "@/hooks/subscription.hooks";
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
import LoaderScreen from "../Shared/Loader";

const DealerSubscriptionDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleSubscription(id as string);
  const [currentDeliveryPhoto, setCurrentDeliveryPhoto] = useState(0);
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  console.log(data);

  const calculateDaysRemaining = () => {
    const endDate = new Date(data?.data?.leaseEndDate);
    const today = new Date();
    const daysRemaining = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, daysRemaining);
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <Link
        href="/dealer?tab=subscriptions"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Subscriptions
      </Link>

      {/* <SubscriptionTimeline currentStep={currentStep} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Progress */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Subscription Progress</h2>
                <span className="text-sm text-muted-foreground">
                  {calculateDaysRemaining()} days remaining
                </span>
              </div>
              {/* <Progress value={calculateProgress()} className="h-2" /> */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {new Date(data?.data?.leaseStartDate).toLocaleDateString()}
                </span>
                <span>
                  {new Date(data?.data?.leaseEndDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Customer Details */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">
                  {data?.data?.userId?.firstName}
                  {" " + data?.data?.userId?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{data?.data?.userId?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">
                  {data?.data?.requestId?.customerInfo?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {data?.data?.requestId?.address?.addressLine1}
                </p>
              </div>
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
                <p className="text-sm text-muted-foreground">Vehicle</p>
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
            </div>
          </Card>

          {/* Subscription Details */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Subscription Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="font-medium">£{data?.data?.leasePrice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {new Date(data?.data?.leaseStartDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">
                  {new Date(data?.data?.leaseEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Delivery Details */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">
                  Delivery Date & Time
                </Label>
                <p className="font-medium mt-1">
                  {new Date(data?.data?.deliveryDateAndtime).toLocaleString()}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Car PDI Document
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Delivery-pdi-document.pdf
                </Button>
              </div>

              <div>
                <Label className="text-muted-foreground">Car Photos</Label>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mt-2 mb-4">
                  <Image
                    src={data?.data?.carImages[currentDeliveryPhoto]?.url}
                    alt="Car delivery photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {data?.data?.carImages?.map(
                    (photo: { url: string }, index: number) => (
                      <div
                        key={index}
                        className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden ${
                          currentDeliveryPhoto === index
                            ? "ring-2 ring-burgundy"
                            : ""
                        }`}
                        onClick={() => setCurrentDeliveryPhoto(index)}
                      >
                        <Image
                          src={photo?.url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Dealer Comments</Label>
                <p className="mt-1">{data?.data?.dealerComment}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Customer Comments
                </Label>
                <p className="mt-1">{data?.data?.customerComment}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">
                    Starting Mileage
                  </Label>
                  <p className="font-medium mt-1">
                    {data?.data?.startingMiles?.toLocaleString()} miles
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Fuel Level</Label>
                  <p className="font-medium mt-1">{data?.data?.fuelLabel}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Status</h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Current Status
                </p>
                <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {data?.data?.status}
                </span>
              </div>

              <AlertDialog
                open={showReturnDialog}
                onOpenChange={setShowReturnDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-white">
                    Start Return Process
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Start Return Process</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to start the vehicle return process?
                      This will begin documenting the return condition and any
                      applicable charges.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      // onClick={handleStartReturn}
                      className="bg-burgundy hover:bg-burgundy/90"
                    >
                      Start Return
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealerSubscriptionDetails;
