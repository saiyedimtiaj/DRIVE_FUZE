"use server";

import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getAllTestimonial = async () => {
  try {
    const { data } = await axiosInstance.get(`/testimonial`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createTestimonial = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/testimonial`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateTestimonial = async (payload: {
  id: string;
  payload: FieldValues;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/testimonial/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/testimonial/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
