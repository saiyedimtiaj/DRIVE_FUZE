import React from "react";
import { Card } from "../ui/card";

const UserRequestStatus = ({ currentStep }: { currentStep: number }) => {
  switch (currentStep) {
    case 1:
      return (
        <Card className="p-6 mb-8 bg-burgundy/5 border-burgundy/20">
          <p className="text-lg text-primary">
            Thank you for your request! We&apos;re verifying your identity,
            conducting credit checks, and confirming car availability.
            You&apos;ll receive instructions for verification soon, and
            we&apos;ll notify you once everything is ready to complete your
            booking.
          </p>
        </Card>
      );
    case 2:
      return (
        <Card className="p-6 mb-8 bg-burgundy/5 border-burgundy/20">
          <p className="text-lg text-primary">
            Your subscription is approved!{" "}
            {/* {data?.data?.status === "Ready for Delivery"
              ? "Your car is ready! Please select your preferred delivery date and time."
              : "We're now preparing your car and will notify you when it's ready to schedule delivery."} */}
          </p>
        </Card>
      );
    case 3:
      return (
        <Card className="p-6 mb-8 bg-burgundy/5 border-burgundy/20">
          <p className="text-lg text-primary">
            Your car is on its way! You&apos;ll receive updates shortly with the
            final details.
          </p>
        </Card>
      );
    default:
      return null;
  }
};

export default UserRequestStatus;
