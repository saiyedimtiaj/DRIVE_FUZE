"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  useAddReturnComment,
  useGetSingleSubscription,
} from "@/hooks/subscription.hooks";
import LoaderScreen from "../Shared/Loader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";

export default function UserSubscriptionDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleSubscription(id as string);
  const [currentListingPhoto, setCurrentListingPhoto] = useState(0);
  const [currentDeliveryPhoto, setCurrentDeliveryPhoto] = useState(0);
  const [comment, setComment] = useState("");
  const { mutate, isPending } = useAddReturnComment();

  const handleDownload = () => {
    const url = data?.data?.deliveryId?.pdiDocument?.url;
    if (!url) {
      alert("No document available to download.");
      return;
    }

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer";
    link.download = "Terms_And_Conditions.pdf"; // Suggests download

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = () => {
    mutate(
      { comment, id: data?.data?._id },
      {
        onSuccess: (data) => {
          toast({
            title: data?.success ? "Sucess" : "Failed",
            description: data?.message,
            variant: data?.success ? "default" : "destructive",
          });
        },
      }
    );
  };

  console.log(data);
  if (isLoading) return <LoaderScreen />;

  return (
    <div className="pb-8">
      <Link
        href="/dashboard/my-subscription"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Subscriptions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Details */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">Subscription Details</h2>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="font-medium">£{data?.data?.leasePrice}</p>
              </div>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Registration</p>
                <p className="font-medium">
                  {data?.data?.carId?.registrationNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Car Name</p>
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
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">
                  {data?.data?.carId?.yearOfManufacture}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="font-medium">{data?.data?.carId?.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price (£)</p>
                <p className="font-medium">{data?.data?.carId?.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dealer</p>
                <p className="font-medium">
                  {data?.data?.dealerId?.firstName + " "}
                  {data?.data?.dealerId?.lastName}
                </p>
              </div>
            </div>
          </Card>

          {/* Technical Specifications */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{data?.data?.carId?.colour}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  CO2 Emissions (g/km)
                </p>
                <p className="font-medium">{data?.data?.carId?.co2Emissions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gearbox</p>
                <p className="font-medium">{data?.data?.carId?.gearbox}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Engine Size (cc)
                </p>
                <p className="font-medium">
                  {data?.data?.carId?.engineCapacity}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Electric Range (km)
                </p>
                <p className="font-medium">
                  {data?.data?.carId?.electricRange}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drive Train</p>
                <p className="font-medium">{data?.data?.carId?.driveTrain}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Euro Status</p>
                <p className="font-medium">{data?.data?.carId?.euroStatus}</p>
              </div>
            </div>
          </Card>

          {/* Car Description */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">Car Description</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: data?.data?.carId?.details }}
            />
          </Card>

          {/* Listing Photos */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">Photos at Listing</h2>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={data?.data?.carId?.images[currentListingPhoto]}
                alt="Car listing photo"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {data?.data?.carId?.images?.map(
                (photo: string, index: number) => (
                  <div
                    key={index}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden ${
                      currentListingPhoto === index
                        ? "ring-2 ring-burgundy"
                        : ""
                    }`}
                    onClick={() => setCurrentListingPhoto(index)}
                  >
                    <Image
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Delivery Photos */}
          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">
              Photos at Start of Subscription
            </h2>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={
                  data?.data?.deliveryId?.carImages?.[currentDeliveryPhoto]?.url
                }
                alt="Car delivery photo"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {data?.data?.deliveryId?.carImages?.map(
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
                      src={photo.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">Add Comment</h2>
            <Label htmlFor="comment">Add Comment</Label>
            {data?.data?.comment ? (
              <p className="mt-2 text-gray-700">{data.data.comment}</p>
            ) : (
              <>
                <Input
                  id="comment"
                  placeholder="Add Return Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-2"
                />
                <Button
                  disabled={isPending || !comment.trim()}
                  onClick={handleAddComment}
                  className="bg-burgundy mt-4 disabled:opacity-50"
                >
                  {isPending ? "Loading..." : "Add Comment"}
                </Button>
              </>
            )}
          </Card>
        </div>

        {/* Documents Sidebar */}
        <div className="space-y-6">
          <Card className="p-4 md:p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Documents</h2>
            <div className="space-y-4">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="w-full flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Terms & Conditions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
