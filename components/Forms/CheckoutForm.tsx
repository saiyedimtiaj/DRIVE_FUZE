import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useUser } from "@/lib/user.provider";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useCreatePayment, useGetPayment } from "@/hooks/payment.hooks";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const { mutate: createConfirmPayment } = useCreatePayment();
  const { id, bookingId } = useParams();
  const { data, isLoading: isPaymentLoading } = useGetPayment(
    bookingId as string
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    if (data?.data) {
      toast({
        title: "Failed",
        description: "Payment information already saved",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Get the card element
      const cardElement = elements.getElement(CardElement);

      // Create PaymentMethod
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement!,
          billing_details: {
            email: user?.email,
            name: `${user?.firstName} ${user?.lastName}`,
          },
        });

      if (paymentMethodError) {
        toast({
          title: "Failed",
          description: paymentMethodError.message || "Payment method error",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        toast({
          title: "Failed",
          description: confirmError.message || "Payment confirmation error",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      } else if (paymentIntent) {
        try {
          createConfirmPayment(
            {
              userId: user?._id as string,
              carId: id as string,
              requestId: bookingId as string,
              paymentMethodId: paymentMethod.id,
              paymentIntentId: paymentIntent.id,
              amount: paymentIntent.amount,
            },
            {
              onSuccess: (data) => {
                if (data?.success) {
                  toast({
                    title: "Success",
                    description: data?.message,
                  });
                  router.push(`/dashboard/subscription-request`);
                } else {
                  toast({
                    title: "Failed",
                    description: data?.message,
                    variant: "destructive",
                  });
                }
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err: any) {
      toast({
        title: "Failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isPaymentLoading) {
    return <LoaderScreen />;
  }

  return (
    <Card className="p-3 mt-8 md:p-6">
      <h1 className="text-lg font-semibold">
        Setup payment c for subscription{" "}
      </h1>
      <p className="mt-1 text-sm">
        No payments will be taken until your vehicle request has been approved
        and your contract has been signed. Your card details will be used for
        the refundable deposit and the first month subscription fee.
      </p>
      <p className="mt-3 mb-6 text-sm">
        By entering your card details, you authorise Apany Ltd to process future
        payments from your card in accordance with our terms and conditions.{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <CardElement id="card-element" />
        <div className="flex justify-between pt-6">
          <Link href={`/subscribe/${id}/booking/${bookingId}/summary`}>
            <Button
              className="text-xs md:text-base"
              type="button"
              variant="outline"
            >
              Back
            </Button>
          </Link>
          <Button
            className="bg-burgundy text-xs md:text-base hover:bg-burgundy/90 text-white"
            disabled={isLoading || !stripe || !elements}
            id="submit"
            type="submit"
          >
            {isLoading ? "Loading..." : "Complete Subscription"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
