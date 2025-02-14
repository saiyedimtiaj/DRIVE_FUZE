"use server";
import axiosInstance from "@/lib/axiosInstance";

export const createReturnDetails = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(`/return`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getReturnDetails = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/return/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
