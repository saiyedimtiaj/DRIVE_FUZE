"use server";

import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getAllDealerSupport = async () => {
  try {
    const { data } = await axiosInstance.get(`/dealer-support`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleDealerSupport = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/dealer-support/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createDealerSupport = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/dealer-support/create-support`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const sendDealerSupportMessage = async (payload: {
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
      `/dealer-support/send-message/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const changeStatusDealerSupport = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/dealer-support/resolve/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
