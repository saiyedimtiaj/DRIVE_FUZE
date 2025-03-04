/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";

export const createSubscription = async (payload: { deliveryId: string }) => {
  try {
    const { data } = await axiosInstance.post(
      `/subscription/create-subscription`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getSubscriptions = async () => {
  try {
    const { data } = await axiosInstance.get(`/subscription/get-subscription`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleSubscriptions = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/subscription/subscription/${id}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAdminDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/subscription/dashboard-info`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCurrentSubscription = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/subscription/current-subscription`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getDealerDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/subscription/dealer-dashboard-info`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
