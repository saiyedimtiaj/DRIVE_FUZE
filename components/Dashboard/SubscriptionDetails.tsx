import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ISubscription } from "@/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function SubscriptionDetails({
  data,
  setCurrentStep,
}: {
  data: { data: ISubscription };
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  const [currentListingPhoto, setCurrentListingPhoto] = useState(0);
  const [currentDeliveryPhoto, setCurrentDeliveryPhoto] = useState(0);
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  const handleStartReturn = () => {
    setCurrentStep(2);
  };

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Details */}
          <Card className="p-6">
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
          <Card className="p-6">
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
          <Card className="p-6">
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
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Car Description</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: data?.data?.carId?.details as string,
              }}
            />
          </Card>

          {/* Listing Photos */}
          <Card className="p-6">
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
          <Card className="p-6">
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
        </div>

        {/* Documents Sidebar */}
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

              <Button
                onClick={
                  data?.data?.status === "Active"
                    ? () => setShowReturnDialog(true)
                    : () => setCurrentStep(2)
                }
                className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
              >
                {data?.data?.status === "Active"
                  ? "Start Return Process"
                  : "Show Return Details"}
              </Button>
              <AlertDialog
                open={showReturnDialog}
                onOpenChange={setShowReturnDialog}
              >
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
                      onClick={handleStartReturn}
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
}
