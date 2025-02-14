import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CarSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="animate-pulse overflow-hidden border rounded-lg"
        >
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-300"></div>
            <div className="p-4 space-y-4">
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarSkeleton;
