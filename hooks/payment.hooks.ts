import {
  createPayment,
  createPaymentIntent,
  declineRequest,
  getPayment,
  openPortal,
  takePayment,
} from "@/services/payment.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT_INTENT"],
    mutationFn: async (payload: {
      carId: string;
      requestId: string;
      email: string;
    }) => await createPaymentIntent(payload),
  });
};

export const useGetPayment = (id: string) => {
  return useQuery({
    queryKey: ["GET_PAYMENT_BY_REQUEST"],
    queryFn: async () => await getPayment(id),
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (payload: {
      userId: string;
      carId: string;
      requestId: string;
      paymentMethodId: string;
      paymentIntentId: string;
      amount: number;
    }) => await createPayment(payload),
  });
};

export const useTakePayment = () => {
  return useMutation({
    mutationKey: ["ACCEPT_REQUEST_TAKE_PAYMENT"],
    mutationFn: async (payload: { requestId: string }) =>
      await takePayment(payload),
  });
};

export const useDeclineRequest = () => {
  return useMutation({
    mutationKey: ["Ceancel_Payment_request"],
    mutationFn: async (id: string) => await declineRequest(id),
  });
};

export const useCustomerPortal = () => {
  return useMutation({
    mutationKey: ["CUSTOMER_PORTAL"],
    mutationFn: async (payload: { email: string }) => await openPortal(payload),
  });
};
