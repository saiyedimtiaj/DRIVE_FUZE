"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getSinglePrep = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/preparation/request-prep/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const setEarlyPrepDate = async (payload: {
  id: string;
  payload: { date: string; status: string };
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/preparation/set-early-date/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const setSeduleDate = async (payload: { id: string; date: string }) => {
  try {
    const { data } = await axiosInstance.put(
      `/preparation/set-sedule-date/${payload.id}`,
      { date: payload.date }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updatePrepration = async (payload: {
  id: string;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/preparation/update/${payload.id}`,
      payload.formData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const setAwatingDelivery = async (payload: {
  id: string;
  payload: { status: string };
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/preparation/awating-delivery/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const addCustomerComment = async (payload: {
  id: string;
  customerComment: string;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/preparation/customer-comment/${payload.id}`,
      { customerComment: payload.customerComment }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
