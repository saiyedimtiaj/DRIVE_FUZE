"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAllCars } from "@/hooks/car.hooks";
import { TCar } from "@/type";
import LoaderScreen from "../Shared/Loader";

export default function WatchGrid({ isShowAll }: { isShowAll: boolean }) {
  const { data, isLoading } = useGetAllCars();

  console.log(data);

  if (isLoading) {
    return <LoaderScreen />;
  }

  // If isShowAll is false, limit to 4 cars
  const carsToDisplay = isShowAll ? data?.data : data?.data?.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {carsToDisplay?.map((car: TCar) => (
        <Card
          key={car._id}
          className="overflow-hidden border rounded-lg hover:scale-105 transition-transform"
        >
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="relative aspect-video">
              <Image
                src={car?.images?.[0] as string}
                alt={car?.model as string}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Car Name */}
              <h3 className="text-lg font-semibold text-primary mb-1">
                {`${car.model}`}
              </h3>

              {/* Price and Year Section */}
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-xl font-bold text-primary">
                    £{car.price}/pm
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.yearOfManufacture}</p>
                </div>
              </div>

              {/* View Details Button */}
              <Link href={`/subscribe/${car._id}`}>
                <Button className="w-full bg-secondary hover:bg-secondary-dark text-primary font-medium">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
