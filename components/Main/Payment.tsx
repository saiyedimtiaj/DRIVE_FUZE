"use client";

import { useGetSingleRequestsQuery } from "@/hooks/request.hooks";
import { useParams } from "next/navigation";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/user.provider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntent } from "@/hooks/payment.hooks";
import CheckoutForm from "../Forms/CheckoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Payment = () => {
  const { id, bookingId } = useParams();
  const { data: carData } = useGetSingleRequestsQuery(bookingId as string);
  const [clientSecret, setClientSecret] = useState("");
  const { mutate: createPayment } = useCreatePaymentIntent();
  const { user } = useUser();

  useEffect(() => {
    createPayment(
      {
        carId: id as string,
        requestId: bookingId as string,
        email: user?.email as string,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setClientSecret(data?.data?.clientSecret);
          }
        },
      }
    );
  }, [bookingId, id, createPayment, user?.email]);
  const loader = "auto";
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Subscription Summary</h2>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium">{`${carData?.data?.carId?.brand} ${carData?.data?.carId?.model}`}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Variant</p>
              <p className="font-medium">{carData?.data?.carId?.variant}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="font-medium">
                £
                {carData?.data?.carId?.price +
                  (carData?.data?.aditionalDriver === "yes" ? 20 : 0) +
                  (carData?.data?.aditionalMiles === "yes" ? 40 : 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Initial Payment</p>
              <p className="font-medium">
                £{" "}
                {carData?.data?.carId?.price +
                  (carData?.data?.aditionalDriver === "yes" ? 20 : 0) +
                  (carData?.data?.aditionalMiles === "yes" ? 40 : 0) +
                  200}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-4">Main Driver Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{`${carData?.data?.customerInfo?.firstName} ${carData?.data?.customerInfo?.lastName}`}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">
                {carData?.data?.customerInfo?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {carData?.data?.customerInfo?.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">
                {carData?.data?.customerInfo?.licenseNumber}
              </p>
            </div>
          </div>
        </div>

        {carData?.data?.aditionalDriver == "yes" &&
          carData?.data?.aditionalDriverInfo?.firstName && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Additional Driver Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{`${carData?.data?.aditionalDriverInfo?.firstName} ${carData?.data?.aditionalDriverInfo?.lastName}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">
                      {carData?.data?.aditionalDriverInfo?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">
                      {carData?.data?.aditionalDriverInfo?.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      License Number{" "}
                    </p>
                    <p className="font-medium">
                      {carData?.data?.aditionalDriverInfo?.licenseNumber}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-4">What&apos;s Included</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              {carData?.data?.aditionalMiles === "yes" ? "1,200" : "1,000"}{" "}
              miles per month
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              Comprehensive insurance
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              Road tax
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              Maintenance & servicing
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              Breakdown cover
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-burgundy mr-2"></span>
              MOT
            </li>
          </ul>
        </div>
      </Card>

      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance: { theme: "flat" }, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
