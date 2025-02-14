import BookingLayoutCarDetails from "@/components/Main/BookingLayoutCarDetails";
import { CheckoutTimeline } from "@/components/Main/CheckoutTimeline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  return (
    <div className="min-h-screen bg-white pt-20 container mx-auto px-4 pb-8">
      <Link
        href={`/subscribe/${params.id}`}
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to listing
      </Link>

      <CheckoutTimeline />
      <div className="flex items-start flex-col-reverse md:flex-row gap-8">
        <div className="w-full md:w-2/3">{children}</div>
        <BookingLayoutCarDetails id={params.id} />
      </div>
    </div>
  );
};

export default layout;
