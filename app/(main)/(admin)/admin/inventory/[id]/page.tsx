import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CarDetailsDashboard from "@/components/Dashboard/CarDetailsDashboard";

export default function InventoryClient() {
  return (
    <div>
      <div className="container mx-auto px-4 pb-1">
        <Link
          href="/admin/inventory"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Vehicle Details</h1>
        </div>
      </div>
      <div>
        <CarDetailsDashboard />
      </div>
    </div>
  );
}
