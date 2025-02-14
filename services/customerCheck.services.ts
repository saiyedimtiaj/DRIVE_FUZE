"use server";

import { VerificationStatus } from "@/components/Admin/AssessMentDetails";
import axiosInstance from "@/lib/axiosInstance";

export const createCustomerCheck = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/customercheck/create-customercheck",
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleCustomerCheck = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/customercheck/findby-requestId/${id}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCustomerCheck = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/customercheck/customerCheck/${id}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCustomerCheck = async () => {
  try {
    const { data } = await axiosInstance.get(`/customercheck/customerCheck`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateRiskScore = async (
  payload: VerificationStatus,
  id: string
) => {
  try {
    const { data } = await axiosInstance.put(
      `/customercheck/update-status/${id}`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateCustomerCheck = async (payload: FormData, id: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/customercheck/update/${id}`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
