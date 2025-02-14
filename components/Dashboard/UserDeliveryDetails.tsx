"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useGetUserRequestDetails } from "@/hooks/request.hooks";
import UserRequestStatus from "./UserRequestStatus";
import LoaderScreen from "../Shared/Loader";
import {
  useAddCustomerComment,
  useGetSinglePreparetion,
} from "@/hooks/Prep.hooks";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

export default function UserDeliveryDetails() {
  const [customerComment, setCustomerComment] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetUserRequestDetails(id as string);
  const {
    data: prepData,
    isLoading: isPrepLoading,
    refetch,
  } = useGetSinglePreparetion(id as string);
  const { mutate, isPending } = useAddCustomerComment();

  console.log(prepData);

  const handleAddComment = () => {
    mutate(
      { customerComment: customerComment, id: prepData?.data?._id },
      {
        onSuccess: (data) => {
          toast({
            title: data?.success ? "Successfull" : "Failed",
            description: data?.message,
            variant: data?.success ? "default" : "destructive",
          });
          refetch();
        },
      }
    );
  };

  if (isLoading || isPrepLoading) return <LoaderScreen />;

  return (
    <>
      <div className="container mx-auto pb-8">
        <UserRequestStatus currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Request Details</h2>
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
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Price</p>
                  <p className="font-medium">
                    £{data?.data?.requestId?.leasePrice}
                  </p>
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
            <Card className="p-6">
              <Label className="text-muted-foreground mb-2">Car Photos</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 lg:grid-cols-3">
                {prepData?.data?.carImages?.map((img: { url: string }) => (
                  <Image
                    key={img?.url}
                    src={img?.url}
                    alt="image"
                    width={550}
                    height={550}
                    className="w-full h-full rounded-sm object-cover"
                  />
                ))}
              </div>
              <Separator className="mt-4 mb-2" />
              <div>
                <Label className="text-muted-foreground">
                  Customer Comments
                </Label>
                {prepData?.data?.customerComment ? (
                  <p>{data?.data?.customerComment}</p>
                ) : (
                  <div>
                    <Textarea
                      value={customerComment}
                      onChange={(e) => setCustomerComment(e.target.value)}
                      placeholder="Add your comments about the vehicle preparation..."
                      className="mt-2"
                    />
                    <Button
                      disabled={!customerComment || isPending}
                      onClick={handleAddComment}
                      className="mt-2"
                    >
                      Add Comment
                    </Button>
                  </div>
                )}
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
                    {data?.data?.status}
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
    </>
  );
}
