"use server";

import axiosInstance from "@/lib/axiosInstance";

export const createDelivery = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      `/delivery/create-delivery`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleDelivery = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/delivery/delivery/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
