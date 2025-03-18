"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useGetSingleCars } from "@/hooks/car.hooks";
import Loader from "../Shared/Loader";

export default function CarDetailsDashboard() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCars(id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(data);

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

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="container mx-auto px-4 pb-8">
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
                  <p className="font-medium">
                    {data?.data?.batterySize || "n/a"}
                  </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
