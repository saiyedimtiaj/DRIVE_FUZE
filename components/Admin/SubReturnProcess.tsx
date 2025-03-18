import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ReturnChargeModal } from "../Modal/ReturnChargeModel";
import { IReturnDetails, ISubscription, TReturnDetails } from "@/type";
import SubDeliveryDetails from "./SubDeliveryDetails";
import ReturnForm from "../Forms/ReturnForm";
import { useCreateReturnDetails } from "@/hooks/return.hooks";
import { Loader } from "lucide-react";
import SubReturrnDetails from "./SubReturnDetails";
import Image from "next/image";

const SubReturnProcess = ({
  data,
  returnData,
  refetch,
  setCurrentStep,
}: {
  data: { data: ISubscription };
  returnData: { data: undefined | IReturnDetails };
  refetch: () => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const { mutate, isPending } = useCreateReturnDetails();
  const [pdiDocument, setPdiDocument] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [images, setImages] = useState<File[]>();
  const [returnDetails, setReturnDetails] = useState<TReturnDetails>({
    date: new Date(data?.data?.leaseEndDate)?.toISOString()?.slice(0, 16),
    dealerComments: "",
    customerComments: "",
    currentMileage: null,
    fuelLevel: "",
    charges: [],
  });

  const handleCompleteReturn = () => {
    let errorMessage = "";

    if (!returnDetails.date) {
      errorMessage = "Please select a return date";
    } else if (!returnDetails.currentMileage) {
      errorMessage = "Please enter the current mileage";
    } else if (!returnDetails.fuelLevel) {
      errorMessage = "Please select the fuel level";
    } else if (!images) {
      errorMessage = "Please upload the return images";
    }

    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("date", returnDetails.date);
    formData.append("dealerComments", returnDetails.dealerComments);
    formData.append("customerComments", data?.data?.comment);
    formData.append("subscriptionId", data?.data?._id);
    formData.append(
      "currentMileage",
      returnDetails.currentMileage as unknown as string
    );
    formData.append("fuelLevel", returnDetails.fuelLevel);

    if (pdiDocument) {
      formData.append("pdiDocument", pdiDocument);
    }

    images!.forEach((photo) => {
      formData.append("photos", photo);
    });

    if (returnDetails.charges.length > 0) {
      formData.append("charges", JSON.stringify(returnDetails.charges));
      returnDetails.charges.forEach((charge) => {
        charge.evidence.forEach((file) => {
          formData.append("chargesEvidence", file);
        });
      });
    }

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast({
            title: "Return Completed",
            description: "The vehicle return has been processed successfully.",
          });
          refetch();
          router.push("/dealer/subscriptions");
        } else {
          toast({
            title: "Return Failed",
            description: data?.message,
            variant: "destructive",
          });
        }
      },
    });
  };

  const handleRemoveCharge = (index: number) => {
    setReturnDetails((prev) => {
      const updatedCharges = prev.charges.filter((_, i) => i !== index);

      const updatedChargesWithLengths = updatedCharges.map((charge, idx) => {
        const startingLength =
          idx === 0 ? 0 : updatedCharges[idx - 1].endingLength;
        const endingLength = startingLength + charge.evidence.length;

        return {
          ...charge,
          startingLength,
          endingLength,
        };
      });

      return {
        ...prev,
        charges: updatedChargesWithLengths,
      };
    });
  };

  const handleAddNewCharge = (charge: {
    category: string;
    description: string;
    amount: number;
    evidence: File[];
    startingLength: number;
    endingLength: number;
  }) => {
    setReturnDetails((prev) => {
      const updatedCharges = [...prev.charges, charge];
      const updatedChargesWithLengths = updatedCharges.map((charge, index) => {
        const startingLength =
          index === 0 ? 0 : updatedCharges[index - 1].endingLength;
        const endingLength = startingLength + charge.evidence.length;

        return {
          ...charge,
          startingLength,
          endingLength,
        };
      });

      return {
        ...prev,
        charges: updatedChargesWithLengths,
      };
    });
  };

  return (
    <>
      {/* Return Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SubDeliveryDetails data={data} />

        {returnData?.data ? (
          <SubReturrnDetails data={returnData as { data: IReturnDetails }} />
        ) : (
          <ReturnForm
            returnDetails={returnDetails}
            setReturnDetails={setReturnDetails}
            startingMileage={data?.data?.deliveryId?.startingMiles}
            images={images}
            setImages={setImages}
            pdiDocument={pdiDocument}
            setPdiDocument={setPdiDocument}
            comment={data?.data?.comment}
          />
        )}
      </div>

      {/* Return Charges */}

      {returnData?.data && (
        <Card className="p-6 mt-5">
          <h3 className="text-lg font-semibold mb-6">Return Charges</h3>
          <div className="space-y-4">
            {returnData?.data?.charges?.map((charge, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{charge.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {charge.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">£{charge.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Evidence:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-5">
                    {charge?.evidence?.map((photo) => (
                      <div key={photo}>
                        <Image
                          className="object-cover w-full h-full rounded-md"
                          width={700}
                          height={700}
                          src={photo}
                          alt="evidence"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 pt-4 border-t">
            <p className="font-semibold">Total Charges</p>
            <p className="font-semibold">
              £
              {returnData?.data?.charges
                ?.reduce((sum, charge) => sum + charge.amount, 0)
                .toFixed(2)}
            </p>
          </div>
        </Card>
      )}
      {!returnData?.data && (
        <Card className="p-6 mt-5">
          <h3 className="text-lg font-semibold mb-6">Return Charges</h3>
          <div className="space-y-4">
            {returnDetails.charges.map((charge, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{charge.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {charge.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">£{charge.amount.toFixed(2)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveCharge(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                {charge.evidence.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Evidence:
                    </p>
                    <div className="text-sm">
                      {charge.evidence.length} file(s) attached
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => setIsChargeModalOpen(true)}
              className="w-full"
            >
              Add Charge
            </Button>

            {returnDetails.charges.length > 0 && (
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-semibold">Total Charges</p>
                <p className="font-semibold">
                  £
                  {returnDetails.charges
                    .reduce((sum, charge) => sum + charge.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      <div
        className={`flex ${
          returnData?.data ? "justify-start" : "justify-end"
        } space-x-4 mt-5`}
      >
        <Button onClick={() => setCurrentStep(1)} variant="outline">
          Back
        </Button>
        {!returnData?.data && (
          <Button
            className="bg-burgundy hover:bg-burgundy/90 text-white"
            onClick={handleCompleteReturn}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
                <p>Loading</p>
              </div>
            ) : (
              "Complete Return"
            )}
          </Button>
        )}
      </div>
      <ReturnChargeModal
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
        onSave={handleAddNewCharge}
      />
    </>
  );
};

export default SubReturnProcess;
