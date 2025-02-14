"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getDataByRegNo = async (payload: {
  registrationNumber: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/car/getby-regno", payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createInventory = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post("/car/add-car", payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getDealerCar = async () => {
  try {
    const { data } = await axiosInstance.get("/car/dealer-cars");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCar = async () => {
  try {
    const { data } = await axiosInstance.get("/car/cars");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleCar = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/car/cars/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateCarStatus = async (payload: {
  status: string;
  id: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/car/update-status/${payload.id}`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateInventory = async (payload: {
  id: string;
  payload: FormData;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/car/update-car/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
