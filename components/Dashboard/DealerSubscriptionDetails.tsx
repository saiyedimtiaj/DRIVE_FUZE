"use client";

import { useGetSingleSubscription } from "@/hooks/subscription.hooks";
import { useParams } from "next/navigation";
import SubscriptionDetails from "./SubscriptionDetails";
import { useState } from "react";
import SubReturnProcess from "../Admin/SubReturnProcess";
import { useGetSingleReturnDetails } from "@/hooks/return.hooks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SubscriptionTimeline from "../Admin/SubscriptionTimeLine";
import LoaderScreen from "../Shared/Loader";

const DealerSubscriptionDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleSubscription(id as string);
  const [currentStep, setCurrentStep] = useState(1);
  const {
    data: returnData,
    isLoading: isReturnLoading,
    refetch,
  } = useGetSingleReturnDetails(id as string);

  console.log(data);

  if (isLoading || isReturnLoading) return <LoaderScreen />;

  return (
    <div>
      <Link
        href="/dealer/subscriptions"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Subscriptions
      </Link>
      <SubscriptionTimeline
        currentStep={currentStep}
        status={data?.data?.status}
      />
      {currentStep === 1 ? (
        <SubscriptionDetails data={data} setCurrentStep={setCurrentStep} />
      ) : (
        <SubReturnProcess
          data={data}
          returnData={returnData}
          refetch={refetch}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
};

export default DealerSubscriptionDetails;
