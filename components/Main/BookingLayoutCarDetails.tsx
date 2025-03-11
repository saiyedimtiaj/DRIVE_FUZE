"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useGetSingleCars } from "@/hooks/car.hooks";
import { useParams, useSearchParams } from "next/navigation";
import { useGetSingleRequestsQuery } from "@/hooks/request.hooks";

const Includes = [
  "Comprehensive insurance",
  "Road tax",
  "Maintenance & servicing",
  "Breakdown cover",
  "MOT",
];

// Loading Skeleton Component
const SkeletonCard = () => (
  <Card className="p-6 animate-pulse w-full md:w-1/3">
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg bg-gray-300"></div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
      </div>
      <Separator />
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <ul className="space-y-2">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

const BookingLayoutCarDetails = ({ id }: { id: string }) => {
  const { bookingId } = useParams();
  const { data, isLoading } = useGetSingleCars(id);
  const { data: bookingData, isLoading: isBookLoading } =
    useGetSingleRequestsQuery(bookingId as string);
  const params = useSearchParams().toString();
  const queryParams = new URLSearchParams(params);

  // Extract query parameters
  const addMiles = queryParams.get("addMiles") === "yes" ? 40 : 0;
  const additionalDriver =
    queryParams.get("additionalDriver") === "yes" ? 20 : 0;

  const carData = data?.data;
  const totalPrice = (carData?.price || 0) + addMiles + additionalDriver;

  return isLoading || isBookLoading ? (
    <SkeletonCard />
  ) : (
    <div className="space-y-6 md:sticky top-24 w-full md:w-1/3">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={carData?.images[0]}
              alt={`${carData?.brand} ${carData?.model}`}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold">{`${carData?.brand} ${carData?.model}`}</h3>
            <p className="text-muted-foreground">{carData?.variant}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{carData?.yearOfManufacture}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Color</p>
              <p className="font-medium">{carData?.colour}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">{carData?.fuelType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gearbox</p>
              <p className="font-medium">{carData?.gearbox}</p>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-baseline mb-4">
              {bookingData?.data ? (
                <p className="text-2xl font-bold">
                  £{bookingData?.data?.leasePrice}
                  /pm
                </p>
              ) : (
                <p className="text-2xl font-bold">£{totalPrice}/pm</p>
              )}
              <p className="text-sm text-muted-foreground">Including VAT</p>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              What&apos;s included:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-burgundy mr-2" />
                {queryParams.get("addMiles") ||
                bookingData?.data?.aditionalMiles === "yes"
                  ? "1,200"
                  : "1,000"}{" "}
                miles per month
              </li>
              {Includes.map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-burgundy mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingLayoutCarDetails;
