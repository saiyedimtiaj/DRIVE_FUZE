"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useGetSingleRequestsQuery } from "@/hooks/request.hooks";
import UserRequestStatus from "./UserRequestStatus";
import LoaderScreen from "../Shared/Loader";

export default function SubscriptionRequestDetails() {
  const { id } = useParams();
  const { data: requestData, isLoading: isReqLoading } =
    useGetSingleRequestsQuery(id as string);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (requestData?.data?.status === "Pending") {
      setCurrentStep(1);
    } else if (requestData?.data?.status === "Approved") {
      setCurrentStep(2);
    }
  }, [requestData]);

  if (isReqLoading) return <LoaderScreen />;

  return (
    <>
      <div className="container mx-auto pb-8">
        <UserRequestStatus currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-6">Request Details</h2>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Registration</p>
                  <p className="font-medium">
                    {requestData?.data?.carId?.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="font-medium">
                    {requestData?.data?.carId?.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Brand</p>
                  <p className="font-medium">
                    {requestData?.data?.carId?.brand}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variant</p>
                  <p className="font-medium">
                    {requestData?.data?.carId?.variant}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Price</p>
                  <p className="font-medium">
                    £{requestData?.data?.leasePrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dealer</p>
                  <p className="font-medium">
                    {requestData?.data?.dealerId?.firstName}{" "}
                    {requestData?.data?.dealerId?.lastName}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.firstName}{" "}
                    {requestData?.data?.customerInfo?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    License Number
                  </p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.licenseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Employment Status
                  </p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.employmentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-medium">
                    {requestData?.data?.customerInfo?.jobTitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Salary</p>
                  <p className="font-medium">
                    £{requestData?.data?.customerInfo?.salary}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Status Sidebar */}
          <div className="space-y-6">
            <Card className="p-4 md:p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Status</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Status
                  </p>
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {requestData?.data?.status}
                  </span>
                </div>
                <div>
                  {/* <p className="text-sm text-muted-foreground">Next Steps</p>
                  <p className="mt-2 text-primary/80">
                <p>Out team will chick you details and</p>
                  </p> */}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
