"use client";

import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleRequestsQuery,
  useGetUserRequestDetails,
} from "@/hooks/request.hooks";
import { useSetSeduleDate } from "@/hooks/Prep.hooks";
import UserRequestStatus from "./UserRequestStatus";
import LoaderScreen from "../Shared/Loader";

export default function UserSubReqDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const { mutate: setSedule } = useSetSeduleDate();
  const {
    data,
    isLoading,
    refetch: ReqRefetch,
  } = useGetUserRequestDetails(id as string);
  const {
    data: requestData,
    isLoading: isReqLoading,
    refetch,
  } = useGetSingleRequestsQuery(id as string);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>("");
  const route = useRouter();

  // Generate available delivery dates (next 10 days)
  const getAvailableDeliveryDates = () => {
    const earliestDate = data?.data?.earlyDeliveryDate;
    if (!earliestDate || isNaN(new Date(earliestDate).getTime())) {
      console.error("Invalid earliestDate:", earliestDate);
      return [];
    }

    const dates: string[] = [];
    const startDate = new Date(earliestDate);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  useEffect(() => {
    if (requestData?.data?.status === "Awating Delivery") {
      route.push(`/dashboard/subscription-request/${id}/delivery`);
    }
  }, [requestData?.data?.status, route, id]);

  // Generate available delivery times (9am-5pm)
  const getAvailableDeliveryTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return times;
  };

  const handleBookDelivery = () => {
    if (!selectedDeliveryDate || !selectedDeliveryTime) {
      toast({
        title: "Error",
        description: "Please select both a delivery date and time.",
        variant: "destructive",
      });
      return;
    }

    const deliveryDateTime = `${selectedDeliveryDate}T${selectedDeliveryTime}:00`;
    setSedule(
      { id: data?.data?._id, date: deliveryDateTime },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({
              title: "Delivery Scheduled",
              description: "Your delivery has been scheduled successfully.",
            });
            setShowDeliveryDialog(false);
            refetch();
            ReqRefetch();
          } else {
            toast({
              title: "Failed",
              description: data?.message,
            });
            setShowDeliveryDialog(false);
          }
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "M/dd/yyyy, h:mm:ss a");
  };

  if (isLoading || isReqLoading) return <LoaderScreen />;

  return (
    <>
      <div className="container mx-auto pb-8">
        <UserRequestStatus currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Details */}
            <Card className="p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-6">Request Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Registration</p>
                  <p className="font-medium">
                    {data?.data?.carId?.registrationNumber ||
                      requestData?.data?.carId?.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="font-medium">
                    {data?.data?.carId?.model ||
                      requestData?.data?.carId?.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Brand</p>
                  <p className="font-medium">
                    {data?.data?.carId?.brand ||
                      requestData?.data?.carId?.brand}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variant</p>
                  <p className="font-medium">
                    {data?.data?.carId?.variant ||
                      requestData?.data?.carId?.variant}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Price</p>
                  <p className="font-medium">
                    £
                    {data?.data?.requestId?.leasePrice ||
                      requestData?.data?.leasePrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dealer</p>
                  <p className="font-medium">
                    {data?.data?.dealerId?.firstName ||
                      requestData?.data?.dealerId?.firstName}{" "}
                    {data?.data?.dealerId?.lastName ||
                      requestData?.data?.dealerId?.lastName}
                  </p>
                </div>
              </div>
            </Card>

            {/* Delivery Details */}
            {data?.data?.status === "Ready for Delivery" && (
              <Card className="p-4 md:p-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">
                      Earliest Available Delivery
                    </Label>
                    <p className="font-medium mt-1">
                      {formatDate(data?.data?.earlyDeliveryDate)}
                    </p>
                  </div>

                  {data?.data?.seduleDate ? (
                    <div>
                      <Label className="text-muted-foreground">
                        Your Scheduled Delivery
                      </Label>
                      <p className="font-medium mt-1">
                        {new Date(data?.data?.seduleDate).toLocaleString()}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setShowDeliveryDialog(true)}
                      >
                        Reschedule Delivery
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="bg-burgundy hover:bg-burgundy/90 text-white"
                      onClick={() => setShowDeliveryDialog(true)}
                    >
                      Schedule Delivery
                    </Button>
                  )}
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Request Timeline</h2>
              <div className="space-y-6">
                <div className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200">
                    <div className="absolute top-2 left-[-4px] w-2 h-2 rounded-full bg-burgundy"></div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        data?.data?.requestId?.createdAt
                      ).toLocaleDateString()}
                    </p>
                    <p className="font-medium">Request Submitted</p>
                    <p className="text-sm text-primary/80 mt-1">
                      Your subscription request has been received and is being
                      processed.
                    </p>
                  </div>
                </div>
                <div className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200">
                    <div className="absolute top-2 left-[-4px] w-2 h-2 rounded-full bg-burgundy"></div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        data?.data?.customerCheck?.updatedAt
                      ).toLocaleDateString()}
                    </p>
                    <p className="font-medium">Identity Verification</p>
                    <p className="text-sm text-primary/80 mt-1">
                      Your identity documents have been verified successfully.
                    </p>
                  </div>
                </div>

                <div className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200">
                    <div className="absolute top-2 left-[-4px] w-2 h-2 rounded-full bg-burgundy"></div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(data?.data?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-medium">Vehicle Preparation</p>
                    <p className="text-sm text-primary/80 mt-1">
                      Your selected vehicle is being prepared for delivery.
                    </p>
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
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {data?.data?.status
                      ? data?.data?.status
                      : requestData?.data?.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Steps</p>
                  <p className="mt-2 text-primary/80">
                    {data?.data?.status === "Ready for Delivery"
                      ? "Please select your preferred delivery date and time to schedule your car delivery."
                      : "Our team is preparing your vehicle for delivery. You'll receive an email when it's ready to schedule delivery."}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delivery Scheduling Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Your Delivery</DialogTitle>
            <DialogDescription>
              Please select your preferred delivery date and time. Deliveries
              are available between 9am and 5pm.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={selectedDeliveryDate}
                onChange={(e) => setSelectedDeliveryDate(e.target.value)}
              >
                <option value="">Select a date</option>
                {getAvailableDeliveryDates().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Delivery Time</Label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={selectedDeliveryTime}
                onChange={(e) => setSelectedDeliveryTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {getAvailableDeliveryTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeliveryDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-burgundy hover:bg-burgundy/90 text-white"
              onClick={handleBookDelivery}
            >
              Schedule Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
