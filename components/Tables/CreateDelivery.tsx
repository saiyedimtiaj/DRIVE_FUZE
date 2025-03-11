"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import CRform from "../Shared/CRForm";
import CRInput from "../Shared/CRInput";
import CRMultiFile from "../Shared/CRMultiFile";
import CRTextArea from "../Shared/CRTextArea";
import { useGetSinglePreparetion } from "@/hooks/Prep.hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Download, Loader } from "lucide-react";
import {
  useCreateDelivery,
  useGetSingleDealivery,
} from "@/hooks/delivery.hooks";
import Image from "next/image";
import LoaderScreen from "../Shared/Loader";
import CRSelect from "../Shared/CRSelect";

export default function CreateDelivery() {
  const { id } = useParams();
  const route = useRouter();
  const { data, isLoading } = useGetSinglePreparetion(id as string);
  const { data: deliveryData, isLoading: isDeliverLoad } =
    useGetSingleDealivery(id as string);
  const { toast } = useToast();
  const [carImages, setCarImages] = useState<(File | string)[]>([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    pdiDocument: null as File | null,
    subscriptionAgreement: null as File | null,
  });

  const { mutate: createDelivery, isPending } = useCreateDelivery();

  const handleFileUpload = (
    field: "pdiDocument" | "subscriptionAgreement",
    file: File | null
  ) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (submitData) => {
    const formData = new FormData();

    if (carImages.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one car photo.",
        variant: "destructive",
      });
      return;
    } else {
      carImages.forEach((photo) => formData.append("images", photo));
    }

    if (deliveryDetails.pdiDocument) {
      formData.append("pdiDocument", deliveryDetails.pdiDocument);
    }

    if (deliveryDetails.subscriptionAgreement) {
      formData.append("aggrement", deliveryDetails.subscriptionAgreement);
    }

    // Ensure correct ISO format
    const payload = {
      ...submitData,
      requestId: data?.data?.requestId,
      dealerId: data?.data?.dealerId,
      userId: data?.data?.userId,
      carId: data?.data?.carId,
      preparationId: data?.data?._id,
      customerComment: data?.data?.customerComment,
    };
    formData.append("data", JSON.stringify(payload));

    createDelivery(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast({
            title: "Success",
            description:
              "Car is ready for delivery wait for admin confirmation",
          });
          route.push("/dealer/fulfillment");
        } else {
          toast({
            title: "Error",
            description: data?.message,
            variant: "destructive",
          });
        }
      },
    });
  };

  if (isLoading || isDeliverLoad) return <LoaderScreen />;

  return (
    <div className="pb-8">
      <CRform onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
              <div className="space-y-6">
                <div>
                  <Label>Booked Delivery Date & Time</Label>
                  <p className="font-medium mt-1">
                    {new Date(data?.data?.deliverySlots).toLocaleString()}
                  </p>
                </div>

                <div>
                  {deliveryData?.data?.confirmDeliveryDate ? (
                    <>
                      <Label>Confirmed Delivery Date & Time</Label>
                      <p className="font-medium mt-1">
                        {new Date(
                          deliveryData?.data?.confirmDeliveryDate
                        ).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <CRInput
                      name="confirmDeliveryDate"
                      label="Confirmed Delivery Date & Time"
                      required
                      type="datetime-local"
                    />
                  )}
                </div>

                <div>
                  <Label>Car PDI Delivery Document</Label>
                  {deliveryData?.data?.pdiDocument ? (
                    <div className="mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        pdi-document.pdf
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) =>
                          handleFileUpload(
                            "pdiDocument",
                            e.target.files?.[0] || null
                          )
                        }
                        className="mt-1"
                      />
                      {deliveryDetails.pdiDocument?.name && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded: {deliveryDetails.pdiDocument.name}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div>
                  <Label>Car Photos at Handover</Label>
                  {deliveryData?.data?.carImages ? (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {deliveryData?.data?.carImages?.map(
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
                    <CRMultiFile setImages={setCarImages} images={carImages} />
                  )}
                </div>

                <Separator />

                <div>
                  {deliveryData?.data?.dealerComment ? (
                    <>
                      <Label>Dealer Comments</Label>
                      <p className="font-medium mt-1">
                        {deliveryData?.data?.dealerComment}
                      </p>
                    </>
                  ) : (
                    <CRTextArea
                      name="dealerComment"
                      label="Dealer Comments"
                      required
                    />
                  )}
                </div>

                <div>
                  <Label>Customer Comments</Label>
                  <p className="mt-1">
                    {data?.data?.customerComment || "Not given yet!"}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">
                    Mileage and Fuel Level at Delivery
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {deliveryData?.data?.startingMiles ? (
                        <>
                          <Label>Starting Mileage</Label>
                          <p className="font-medium mt-1">
                            {deliveryData?.data?.startingMiles}
                          </p>
                        </>
                      ) : (
                        <CRInput
                          name="startingMiles"
                          label="Starting Mileage"
                          required
                          type="number"
                          placeholder="Enter mileage"
                        />
                      )}
                    </div>
                    <div>
                      {deliveryData?.data?.fuelLabel ? (
                        <>
                          <Label>Fuel Level</Label>
                          <p className="font-medium mt-1">
                            {deliveryData?.data?.fuelLabel}
                          </p>
                        </>
                      ) : (
                        <CRSelect
                          name="fuelLabel"
                          label="Fuel Level"
                          required
                          placeholder="e.g., Full, 3/4, 1/2"
                          items={[
                            { name: "Empty", value: "Empty" },
                            { name: "Quarter", value: "Quarter" },
                            { name: "Half", value: "Half" },
                            { name: "Three Quarters", value: "Three Quarters" },
                            { name: "Full", value: "Full" },
                          ]}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Signed Subscription Agreement</Label>
                  {deliveryData?.data?.pdiDocument ? (
                    <div className="mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Subscription-Agreement.pdf
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleFileUpload(
                            "subscriptionAgreement",
                            e.target.files?.[0] || null
                          )
                        }
                        className="mt-1"
                        required
                      />
                      {deliveryDetails.subscriptionAgreement?.name && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded: {deliveryDetails.subscriptionAgreement.name}
                        </p>
                      )}
                    </>
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
                      data?.data?.status === "Awaiting Delivery"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {data?.data?.status}
                  </span>
                </div>

                {data?.data?.status === "Awating Delivery" && (
                  <Button
                    className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
                    type="submit"
                  >
                    {isPending ? (
                      <>
                        <Loader
                          size={25}
                          className="h-4 w-4 animate-spin mr-2"
                        />
                        Creating Subscription...
                      </>
                    ) : (
                      "Mark as Delivered"
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </CRform>
    </div>
  );
}
