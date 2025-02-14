"use server";

import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const createRequest = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/request/create-request",
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateRequest = async (payload: {
  id: string;
  payload: FieldValues;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/request/update-request/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleRequest = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/request/requests/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getUserRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/request/user-requests`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getDealerRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/request/dealer-requests`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/request/requests`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getRequestDetails = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/request/details/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
