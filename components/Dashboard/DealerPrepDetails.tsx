"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Info, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useGetSinglePreparetion,
  useSetEarlyPrepDate,
  useUpdatePrep,
} from "@/hooks/Prep.hooks";
import CRMultiFile from "../Shared/CRMultiFile";
import Image from "next/image";
import LoaderScreen from "../Shared/Loader";

export default function DealerPrepDetails() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSinglePreparetion(id as string);
  const { mutate: setEarlyDate } = useSetEarlyPrepDate();
  const { toast } = useToast();
  const [pdiDocument, setPdiDocument] = useState<File | null>(null);
  const [carPhotos, setCarPhotos] = useState<(File | string)[]>([]);
  const [dealerComments, setDealerComments] = useState("");
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<
    string | null
  >(null);
  const [alternativeDateTime, setAlternativeDateTime] = useState("");
  const [bookedDeliveryDateTime, setBookedDeliveryDateTime] = useState<
    string | null
  >(null);
  const [earliestDeliveryDateTime, setEarliestDeliveryDateTime] = useState<
    string | null
  >(null);
  const { mutate: updatePrep, isPending } = useUpdatePrep();
  const route = useRouter();

  const handlePDIUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPdiDocument(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (data?.data?.status == "Awating Delivery") {
      route.push(`/dealer/fulfillment/${id}/delivery`);
    }
  }, [data?.data?.status, id, route]);

  const handleCarStatusChange = (checked: boolean) => {
    if (checked && !earliestDeliveryDateTime) {
      toast({
        title: "Error",
        description:
          "Please set the earliest delivery date/time before marking the car as ready",
        variant: "destructive",
      });
      return;
    }
    if (data?.data?.status !== "Ready for Delivery") {
      setEarlyDate(
        {
          id: data.data?._id,
          payload: {
            date: earliestDeliveryDateTime as string,
            status: checked ? "Ready for Delivery" : "Preparing",
          },
        },
        {
          onSuccess: (data) => {
            if (data?.success) {
              refetch();
              toast({
                title: data?.data?.status,
                description:
                  data?.data?.status === "Ready for Delivery"
                    ? "Car has been marked as ready for delivery"
                    : "Car has been marked as preparing",
              });
            }
          },
        }
      );
    }
  };

  const handleEarliestDeliveryDateTimeChange = (value: string) => {
    setEarliestDeliveryDateTime(value);
    if (!value) {
      toast({
        title: "Status Updated",
        description:
          "Car status has been set to preparing as no earliest delivery date is set",
      });
    }
  };

  const handleAcceptDeliverySlot = () => {
    if (!selectedDeliverySlot) {
      toast({
        title: "Error",
        description: "Please select a delivery slot",
        variant: "destructive",
      });
      return;
    }

    setBookedDeliveryDateTime(selectedDeliverySlot);
    setShowDeliveryDialog(false);
    toast({
      title: "Success",
      description: "Delivery slot confirmed",
    });
  };

  const handleProposeAlternative = () => {
    if (!alternativeDateTime) {
      toast({
        title: "Error",
        description: "Please specify an alternative date/time",
        variant: "destructive",
      });
      return;
    }

    setBookedDeliveryDateTime(alternativeDateTime);
    setShowDeliveryDialog(false);
    toast({
      title: "Success",
      description: "Alternative delivery slot proposed",
    });
  };

  const handleStatusUpdate = () => {
    const formData = new FormData();
    const errors: string[] = [];

    if (!pdiDocument) {
      errors.push("Please upload the PDI document.");
    } else {
      formData.append("dealerPdi", pdiDocument);
    }

    if (carPhotos.length === 0) {
      errors.push("Please upload at least one car photo.");
    } else {
      carPhotos.forEach((photo) => formData.append("images", photo));
    }

    if (!dealerComments.trim()) {
      errors.push("Please add dealer comments.");
    }

    if (!bookedDeliveryDateTime) {
      errors.push("Please confirm a delivery date/time.");
    }

    if (errors.length > 0) {
      toast({
        title: "Error",
        description: errors.join("\n"),
        variant: "destructive",
      });
      return;
    }

    const payload = {
      deliverySlots: bookedDeliveryDateTime,
      comment: dealerComments,
      status: "In Progress",
    };
    formData.append("data", JSON.stringify(payload));

    updatePrep(
      { id: data?.data?._id, formData },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast({
              title: "Success",
              description: "Delivery updated correctly!",
            });
            refetch(); // Refresh data after success
          } else {
            toast({
              title: "Failed",
              description: res?.message || "Something went wrong!",
              variant: "destructive",
            });
          }
        },
      }
    );
  };

  useEffect(() => {
    setBookedDeliveryDateTime(data?.data?.seduleDate);
  }, [data]);

  if (isLoading) return <LoaderScreen />;

  return (
    <>
      <div className="pb-8">
        <Link
          href={`/dealer?tab=fulfillment`}
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Fulfillment
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Fulfillment Details</h2>
              <div className="space-y-6">
                {data?.data?.status === "Awating Delivery" ? (
                  <div>
                    <Label className="text-muted-foreground">
                      Car Readiness Status
                    </Label>
                    <p className="font-medium mt-1">{data?.data?.status}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-muted-foreground">
                        Car Readiness Status
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Switch
                          disabled={
                            data?.data?.status === "In Progress" ||
                            data?.data?.status === "Awating Delivery"
                          }
                          checked={
                            data?.data?.status === "Ready for Delivery" ||
                            data?.data?.status === "Awaiting Delivery" ||
                            data?.data?.status === "In Progress"
                          }
                          onCheckedChange={handleCarStatusChange}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full border border-gray-300 ${
                            data?.data?.status === "Ready for Delivery"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            data?.data?.status === ""
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {data?.data?.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 ml-8">
                      <Label className="text-muted-foreground">
                        Earliest Delivery Date & Time
                      </Label>
                      <Input
                        type="datetime-local"
                        value={
                          data?.data?.earlyDeliveryDate
                            ? data?.data?.earlyDeliveryDate
                            : earliestDeliveryDateTime
                        }
                        onChange={(e) =>
                          handleEarliestDeliveryDateTimeChange(e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {data?.data?.deliverySlots ? (
                  <div>
                    <Label>Delivery Date</Label>
                    <p className="font-medium">
                      {new Date(data?.data?.deliverySlots).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <Label className="text-muted-foreground">
                        Customer&apos;s Preferred Delivery Slots
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Select from customer&apos;s preferred slots or
                              propose an alternative
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {bookedDeliveryDateTime ? (
                      <div className="mt-2">
                        <p className="font-medium">
                          Booked:{" "}
                          {new Date(bookedDeliveryDateTime).toLocaleString()}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDeliveryDialog(true)}
                          className="mt-2"
                          disabled={data?.data?.status === "Awaiting Delivery"}
                        >
                          Change Delivery Slot
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowDeliveryDialog(true)}
                        className="mt-2"
                        disabled={!data?.data?.earlyDeliveryDate}
                      >
                        Select Delivery Slot
                      </Button>
                    )}
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">
                    Car PDI Document
                  </Label>
                  <div className="mt-2">
                    {data?.data?.dealerPdi?.url ? (
                      <Button className="px-8 py-1" variant="outline">
                        <a
                          href={data?.data?.dealerPdi?.url}
                          className="text-burgundy hover:text-burgundy/80 font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Dealer-pdi.pdf
                        </a>
                      </Button>
                    ) : (
                      <>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={handlePDIUpload}
                        />
                        {pdiDocument && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Uploaded: {pdiDocument.name}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {data?.data?.carImages?.length ? (
                  <div>
                    <Label className="text-muted-foreground mb-2">
                      Car Photos
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
                      {data?.data?.carImages?.map((img: { url: string }) => (
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
                  </div>
                ) : (
                  <div className="mt-5">
                    <Label className="text-muted-foreground mb-2">
                      Car Photos
                    </Label>
                    <CRMultiFile setImages={setCarPhotos} images={carPhotos} />
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">
                    Dealer Comments
                  </Label>
                  {data?.data?.comment ? (
                    <p>{data?.data?.comment}</p>
                  ) : (
                    <Textarea
                      value={dealerComments}
                      onChange={(e) => setDealerComments(e.target.value)}
                      placeholder="Add your comments about the vehicle preparation..."
                      className="mt-2"
                    />
                  )}
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

                {data?.data?.status === "Ready for Delivery" && (
                  <Button
                    className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
                    onClick={handleStatusUpdate}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader
                          size={25}
                          className="h-4 w-4 animate-spin mr-2"
                        />
                        Updating...
                      </>
                    ) : (
                      "Update to Awaiting Delivery"
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delivery Slot Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Delivery Slot</DialogTitle>
            <DialogDescription>
              Choose from customer&apos;s preferred slots or propose an
              alternative
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Customer&apos;s Preferred Slots</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="deliverySlot"
                  value={data?.data?.seduleDate}
                  checked={selectedDeliverySlot === data?.data?.seduleDate}
                  onChange={(e) => setSelectedDeliverySlot(e.target.value)}
                  className="mr-2"
                />
                <span>{new Date(data?.data?.seduleDate).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Or Propose Alternative</Label>
              <Input
                type="datetime-local"
                value={alternativeDateTime}
                onChange={(e) => setAlternativeDateTime(e.target.value)}
                min={earliestDeliveryDateTime || undefined}
              />
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
              variant="outline"
              onClick={handleProposeAlternative}
              disabled={!alternativeDateTime}
            >
              Propose Alternative
            </Button>
            <Button
              className="bg-burgundy hover:bg-burgundy/90 text-white"
              onClick={handleAcceptDeliverySlot}
              disabled={!selectedDeliverySlot}
            >
              Accept Selected Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
