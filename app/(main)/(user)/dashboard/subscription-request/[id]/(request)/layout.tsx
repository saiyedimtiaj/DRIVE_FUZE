import TransactionTimeline from "@/components/Admin/TransactionTimeline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Link
        href="/dashboard/subscription-request"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Fulfillment
      </Link>
      <TransactionTimeline />
      {children}
    </div>
  );
};

export default layout;
