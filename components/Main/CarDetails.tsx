"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetSingleCars } from "@/hooks/car.hooks";
import Loader from "../Shared/Loader";

const included = [
  "Comprehensive insurance",
  "Road tax",
  "Maintenance & servicing",
  "Breakdown cover",
  "MOT",
];

export default function CarDetails({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleCars(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(data?.data?.price || 0);
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    let newPrice = data?.data?.price || 0;
    if (selectedExtras.includes("additionalDriver")) {
      newPrice += 20;
    }
    if (selectedExtras.includes("addMiles")) {
      newPrice += 40;
    }
    setTotalPrice(newPrice);
  }, [selectedExtras, data]);

  // Function to toggle extras
  const handleExtraClick = (extra: string) => {
    const currentExtras = [...selectedExtras];
    const index = currentExtras.indexOf(extra);

    // Add or remove from selectedExtras
    if (index > -1) {
      currentExtras.splice(index, 1);
    } else {
      currentExtras.push(extra);
    }

    // Update state
    setSelectedExtras(currentExtras);

    // Update searchParams
    if (index > -1) {
      params.delete(extra);
    } else {
      params.set(extra, "yes");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === data?.data?.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? data?.data?.images.length - 1 : prev - 1
    );
  };

  const handleContinue = () => {
    selectedExtras.forEach((extra) => params.set(extra, "yes"));
    router.push(`/subscribe/${data?.data?._id}/booking/?${params.toString()}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/subscribe"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={data?.data?.images[currentImageIndex]}
                alt={`${data?.data?.brand} ${data?.data?.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="bg-white/80 hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="bg-white/80 hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-1 rounded-lg">
                <p className="text-sm font-medium text-black">
                  {currentImageIndex + 1}/{data?.data?.images.length}
                </p>
              </div>
            </div>

            {/* Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vehicle Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Brand</p>
                  <p className="font-medium">{data?.data?.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-medium">{data?.data?.colour}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{data?.data?.yearOfManufacture}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{data?.data?.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{data?.data?.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    CO2 emissions (g/km)
                  </p>
                  <p className="font-medium">{data?.data?.co2Emissions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variant</p>
                  <p className="font-medium">{data?.data?.variant}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gearbox</p>
                  <p className="font-medium">{data?.data?.gearbox}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Engine size (cc)
                  </p>
                  <p className="font-medium">{data?.data?.engineCapacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Electric range
                  </p>
                  <p className="font-medium">{data?.data?.electricRange}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drive train</p>
                  <p className="font-medium">{data?.data?.driveTrain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Battery size (kWh)
                  </p>
                  <p className="font-medium">{data?.data?.batterySize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Euro status</p>
                  <p className="font-medium">{data?.data?.euroStatus}</p>
                </div>
              </div>
            </Card>

            {/* Specifications */}
            <Card className="p-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Car Specification
                </h2>
                <ul className="space-y-2">
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: data?.data?.details }}
                  />
                </ul>
              </div>
            </Card>
          </div>

          {/* Right Column - Key Details and Pricing */}
          <div className="space-y-8">
            <Card className="p-6">
              <div className="space-y-1">
                <div>
                  <p className="text-xl font-bold">{`${data?.data?.brand} ${data?.data?.model}`}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">{data?.data?.year}</p>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{data?.data?.colour}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel type</p>
                    <p className="font-medium">{data?.data?.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gearbox</p>
                    <p className="font-medium">{data?.data?.gearbox}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Range</p>
                    <p className="font-medium">{data?.data?.electricRange}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-4xl font-bold">£{totalPrice}/pm</p>
                  <p className="text-sm text-muted-foreground">
                    Inclusive of VAT
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    What aditionalDrivers included:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-burgundy mr-2" />
                      {selectedExtras.includes("addMiles") ? "1,200" : "1,000"}{" "}
                      miles per month
                    </li>
                    {included.map((item, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-burgundy mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h1 className="text-lg font-semibold">Optional extras</h1>
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => handleExtraClick("additionalDriver")}
                      className={`flex w-full flex-col items-center rounded justify-center gap-y-1 py-6 cursor-pointer ${
                        selectedExtras.includes("additionalDriver")
                          ? "border-2 border-black"
                          : "border border-gray-400"
                      }`}
                    >
                      <p className="text-xs">Additional driver</p>
                      <p className="text-sm font-semibold">£20/pm</p>
                    </div>
                    <div
                      onClick={() => handleExtraClick("addMiles")}
                      className={`flex w-full flex-col items-center rounded justify-center gap-y-1 py-6 cursor-pointer ${
                        selectedExtras.includes("addMiles")
                          ? "border-2 border-black"
                          : "border border-gray-400"
                      }`}
                    >
                      <p className="text-xs">Add 200 miles</p>
                      <p className="text-sm font-semibold">£40/pm</p>
                    </div>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-white">
                      Subscribe Now
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-2xl w-full sm:w-[90%] bg-white text-black shadow-lg p-4 sm:p-6">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg sm:text-2xl">
                        Subscription Requirements
                      </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base">
                            Eligibility requirements before you start:
                          </h4>
                          <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                            <li>
                              You must be 25 years and over on your subscription
                              start date
                            </li>
                            <li>
                              You must have held a UK driving license for over 1
                              year, with no more than 6 points on your license
                            </li>
                            <li>
                              You must have had no County Court Judgments (CCJs)
                              within the last 5 years
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base">
                            Subscription confirmation is subject to:
                          </h4>
                          <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                            <li>Verifying your identity</li>
                            <li>Passing our soft credit checks</li>
                            <li>The vehicle being in stock</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-sm sm:text-base">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-burgundy hover:bg-burgundy/90 text-sm sm:text-base"
                        onClick={handleContinue}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
