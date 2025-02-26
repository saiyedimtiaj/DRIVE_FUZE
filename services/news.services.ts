/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const getAllNews = async () => {
  try {
    const { data } = await axiosInstance.get(`/news`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createNews = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(`/news`, payload);
    revalidateTag("news");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateNews = async (payload: {
  id: string;
  payload: FormData;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/news/${payload.id}`,
      payload.payload
    );
    revalidateTag("news");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteNews = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/news/${id}`);
    revalidateTag("news");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllNewslient = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/news`,
      {
        next: {
          tags: ["news"],
        },
      }
    );
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleNews = async (id: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/news/${id}`,
      {
        next: {
          tags: ["news"],
        },
      }
    );
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};
