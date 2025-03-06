"use client";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { TCar } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import CarSkeleton from "../Scaleton/CarScaleton";

const AllCars = ({
  limit,
  showPagenation = false,
}: {
  limit: string;
  showPagenation?: boolean;
}) => {
  const [queryParams, setQueryParams] = useState({
    searchQuery: "",
    brandFilter: "",
    priceRangeFilter: "",
    conditionFilter: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", queryParams, currentPage],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        ...queryParams,
        limit,
        page: currentPage.toString(),
      }).toString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/car/all-cars-user?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      return response.json();
    },
  });

  console.log(data);
  console.log(error);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Update queryParams with form data
    setQueryParams({
      searchQuery: (formData.get("model") as string) || "",
      brandFilter: (formData.get("brand") as string) || "",
      priceRangeFilter: (formData.get("priceRange") as string) || "",
      conditionFilter: (formData.get("condition") as string) || "",
    });
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (data?.meta?.page < data?.meta?.totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (data?.meta?.page > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  console.log(data);

  console.log(error);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cars..."
              className="pl-10"
              name="model"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select name="brand">
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rolex">Rolex</SelectItem>
                <SelectItem value="TOYOTA">TOYOTA</SelectItem>
                <SelectItem value="patek">Patek Philippe</SelectItem>
                <SelectItem value="ap">Audemars Piguet</SelectItem>
              </SelectContent>
            </Select>
            <Select name="priceRange">
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">$0 - $1,000/mo</SelectItem>
                <SelectItem value="1000-2500">$1,000 - $2,500/mo</SelectItem>
                <SelectItem value="2500+">$2,500+/mo</SelectItem>
              </SelectContent>
            </Select>
            <Select name="condition">
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full bg-[#800020] text-white">
              Search
            </Button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <CarSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((car: TCar) => (
            <Card
              key={car._id}
              className="overflow-hidden border rounded-lg hover:scale-105 transition-transform"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={car?.images?.[0] as string}
                    alt={car?.model as string}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {`${car.model}`}
                  </h3>

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

                  <Link href={`/subscribe/${car._id}`}>
                    <Button className="w-full bg-[#800020] text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {showPagenation && (
        <div className="flex items-center justify-center mt-12 gap-3">
          <Button
            onClick={handlePrevious}
            className="py-0.5 px-3"
            variant="outline"
            disabled={data?.meta?.page <= 1}
          >
            <FaArrowLeft />
          </Button>
          <p className="font-medium">
            {data?.meta?.page}/{data?.meta?.totalPage}
          </p>
          <Button
            onClick={handleNext}
            className="py-0.5 px-3"
            variant="outline"
            disabled={data?.meta?.page >= data?.meta?.totalPage}
          >
            <FaArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllCars;
