"use server";
import axiosInstance from "@/lib/axiosInstance";

export const createPaymentIntent = async (payload: {
  carId: string;
  requestId: string;
  email: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/payment/create-payment-intent",
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getPayment = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/payment/payment/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createPayment = async (payload: {
  userId: string;
  carId: string;
  requestId: string;
  paymentMethodId: string;
  paymentIntentId: string;
  amount: number;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/payment/confirm-payment",
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const takePayment = async (payload: { requestId: string }) => {
  try {
    const { data } = await axiosInstance.post("/payment/take-payment", payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const declineRequest = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(`/payment/decline-request/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const openPortal = async (payload: { email: string }) => {
  try {
    const { data } = await axiosInstance.post(
      `/payment/customer-portal`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
