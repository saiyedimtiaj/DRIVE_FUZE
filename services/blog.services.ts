"use server";

import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getAllBlogs = async () => {
  try {
    const { data } = await axiosInstance.get(`/blog`);
    revalidateTag("blog");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createBlog = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/blog`, payload);
    revalidateTag("blog");
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
    revalidateTag("blog");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blog/${id}`);
    revalidateTag("blog");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllBlogsClient = async () => {
  try {
    const data = await fetch("http://localhost:5000/api/v1/blog", {
      next: {
        tags: ["blog"],
      },
    });
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSingleBlog = async (id: string) => {
  try {
    const data = await fetch(`http://localhost:5000/api/v1/blog/${id}`, {
      next: {
        tags: ["blog"],
      },
    });
    return data.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};
