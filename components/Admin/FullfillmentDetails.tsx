"use client";

import { useParams } from "next/navigation";
import { Info, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useGetSinglePreparetion,
  useSetAwatingDelivery,
} from "@/hooks/Prep.hooks";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

export default function FulfillmentDetails() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSinglePreparetion(id as string);
  const { mutate, isPending } = useSetAwatingDelivery();

  const handleStatusUpdate = () => {
    mutate(
      { id: id as string, payload: { status: "Awating Delivery" } },
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

  console.log(data);

  if (isLoading) return <LoaderScreen />;

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Fulfillment Details</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">
                  Car Readiness Status
                </Label>
                <p className="font-medium mt-1">
                  {data?.data?.status === "In Progerss"
                    ? "Awaiting Preparation"
                    : "Ready for Delivery"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Label className="text-muted-foreground">
                    Earliest Delivery Date & Time
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This date and time is the earliest the car can be
                          delivered to/collected by the customer
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="font-medium mt-1">
                  {(data?.data?.earlyDeliveryDate &&
                    new Date(data?.data?.earlyDeliveryDate).toLocaleString()) ||
                    "Not ready for delivery"}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground">
                  Car PDI Document
                </Label>
                <div className="mt-1">
                  {data?.data?.dealerPdi?.url ? (
                    <a
                      href={data?.data?.dealerPdi?.url}
                      className="text-burgundy hover:text-burgundy/80 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      car-pdi-document.pdf
                    </a>
                  ) : (
                    <p>Not upload yet!</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Car Photos</Label>
                {data?.data?.carImages ? (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {data?.data?.carImages.map(
                      (photo: { url: string }, index: number) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={photo.url}
                            alt={`Car photo ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                            fill
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <h1 className="text-xl font-semibold">No images upload!</h1>
                )}
              </div>

              <div>
                <Label className="text-muted-foreground">Dealer Comments</Label>
                <p className="mt-1">{data?.data?.comment || "No comment"}</p>
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
                    data?.data?.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {data?.data?.status}
                </span>
              </div>
            </div>
            {data?.data?.status !== "Awating Delivery" && (
              <Button
                className="w-full mt-7"
                disabled={isPending}
                onClick={handleStatusUpdate}
              >
                {isPending ? (
                  <>
                    <Loader className="animate-spin" />
                  </>
                ) : (
                  "Update to Awating Delivery"
                )}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
