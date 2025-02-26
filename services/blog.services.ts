/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getAllBlogs = async () => {
  try {
    const { data } = await axiosInstance.get(`/blog`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createBlog = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/blog`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateBlog = async (payload: {
  id: string;
  payload: FieldValues;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/blog/${payload.id}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blog/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllBlogsClient = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog`,
      {
        next: {
          tags: ["blog"],
        },
      }
    );
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleBlog = async (id: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog/${id}`,
      {
        next: {
          tags: ["blog"],
        },
      }
    );
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};
