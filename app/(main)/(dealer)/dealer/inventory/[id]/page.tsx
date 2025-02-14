import EditCar from "@/components/Forms/EditCar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="container mx-auto pb-8">
        <Link
          href="/dealer/inventory"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Link>

        <h1 className="text-3xl font-bold mb-4">Edit Vehicle</h1>
      </div>
      <EditCar />
    </div>
  );
};

export default page;
