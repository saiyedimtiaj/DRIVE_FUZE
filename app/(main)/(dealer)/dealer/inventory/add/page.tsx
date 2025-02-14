import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreateInventory from "@/components/Forms/CreateInventory";

export default function AddVehiclePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto pb-8">
        <Link
          href="/dealer/inventory"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Link>

        <h1 className="text-3xl font-bold mb-4">Add New Vehicle</h1>
      </div>
      <CreateInventory />
    </div>
  );
}
