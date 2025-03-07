"use client";

import { useParams, useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useGetSingleDealivery } from "@/hooks/delivery.hooks";
import Image from "next/image";
import { useCreateSubsctiption } from "@/hooks/subscription.hooks";
import LoaderScreen from "../Shared/Loader";

export default function DeliveryDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleDealivery(id as string);
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = useCreateSubsctiption();

  const handleStatusUpdate = async () => {
    mutate(
      { deliveryId: data?.data?._id },
      {
        onSuccess: (data) => {
          toast({
            title: data?.success ? "Sucessfull" : "Failed",
            description: data?.message,
            variant: data?.success ? "default" : "destructive",
          });
          if (data?.success) {
            router.push(`/admin/subscriptions`);
          }
        },
      }
    );
  };

  console.log(data);

  if (isLoading) return <LoaderScreen />;

  return (
    <div className="container mx-auto pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">
                  Confirmed Delivery Date & Time
                </Label>
                <p className="font-medium mt-1">
                  {data?.data?.confirmDeliveryDate
                    ? new Date(data?.data?.confirmDeliveryDate).toLocaleString()
                    : "Not select yet!"}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Car PDI Delivery Document
                </Label>
                <div className="mt-1">
                  {data?.data?.pdiDocument?.url ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <a
                        href={data?.data?.pdiDocument?.url}
                        className="text-burgundy hover:text-burgundy/80 font-medium flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" />
                        delivery-pdi-document.pdf
                      </a>
                    </Button>
                  ) : (
                    "Not upload Yet"
                  )}
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Car Photos at Handover
                </Label>
                {data?.data?.carImages ? (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {data?.data?.carImages?.map(
                      (photo: { url: string }, index: number) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={photo?.url}
                            alt={`Handover photo ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                            fill
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p>Not upload yet</p>
                )}
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">Dealer Comments</Label>
                <p className="mt-1">
                  {data?.data?.dealerComment || "Not given yet!"}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Customer Comments
                </Label>
                <p className="mt-1">
                  {data?.data?.preparationId?.customerComment ||
                    "Not given yet!"}
                </p>
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">
                  Mileage and Fuel Level at Delivery
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Starting Mileage
                    </p>
                    {data?.data?.startingMiles ? (
                      <p className="font-medium">
                        {data?.data?.startingMiles?.toLocaleString()} miles
                      </p>
                    ) : (
                      "Not given yet!"
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Level</p>
                    <p className="font-medium">
                      {data?.data?.fuelLabel || "Not given yet"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Signed Subscription Agreement
                </Label>
                <div className="mt-1">
                  {data?.data?.subscriptionAggrement?.url ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <a
                        href={data?.data?.subscriptionAggrement?.url}
                        className="text-burgundy hover:text-burgundy/80 font-medium flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" />
                        delivery-pdi-document.pdf
                      </a>
                    </Button>
                  ) : (
                    "Not upload Yet"
                  )}
                </div>
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
                    data?.data?.status === "Confirmation For Delivery"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {data?.data?.status ? data?.data?.status : "Awating Delivery"}
                </span>
              </div>

              {data?.data?.status === "Confirmation For Delivery" && (
                <Button
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
                  onClick={handleStatusUpdate}
                  disabled={isPending}
                >
                  {isPending ? "Creating Subscription..." : "Mark as Delivered"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
