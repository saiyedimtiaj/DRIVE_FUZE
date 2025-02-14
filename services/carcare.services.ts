"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getAllCarCare = async () => {
  try {
    const { data } = await axiosInstance.get(`/carcare/carcare`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleCarCare = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/carcare/carcare/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createCarCare = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      `/carcare/create-carcare`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const sendCarCareMessage = async (payload: {
  id: string;
  payload: {
    name: string;
    role: string;
    message: string;
    time: Date;
  };
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/carcare/send-message/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const changeStatusCarCare = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/carcare/resolve/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
