/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";

export type TCreateUser = {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
};

export const createUser = async (userData: TCreateUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const verifyUser = async (userData: {
  token: string;
  activateCode: string;
}) => {
  console.log(userData);
  try {
    const { data } = await axiosInstance.post(
      "/auth/activate-account",
      userData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const logInUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 300,
      });
      cookies().set("refreshToken", data?.data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const logout = async () => {
  try {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (err: any) {
    return err?.message;
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const { data } = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        "x-refresh-token": refreshToken,
      },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

export const currentUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/user`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateDealerInfo = async (payload: {
  payload: FieldValues;
  dealerId: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/auth/update-dealer/${payload.dealerId}`,
      payload.payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllDealers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/dealers`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCustomers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/customers`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateUserAccount = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.put(`/auth/update`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const forgotPassword = async (userData: { email: string }) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", userData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const changePassword = async (userData: {
  password: string;
  token: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateRole = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/auth/update-role/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
