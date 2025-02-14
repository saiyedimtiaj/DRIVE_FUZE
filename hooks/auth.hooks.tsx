import {
  changePassword,
  createUser,
  currentUser,
  forgotPassword,
  getAllCustomers,
  getAllDealers,
  logInUser,
  TCreateUser,
  updateDealerInfo,
  updateRole,
  updateUserAccount,
  verifyUser,
} from "@/services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["USER_CREATE"],
    mutationFn: async (userData: TCreateUser) => await createUser(userData),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["Forgot_password"],
    mutationFn: async (userData: { email: string }) =>
      await forgotPassword(userData),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["Change_password"],
    mutationFn: async (userData: { password: string; token: string }) =>
      await changePassword(userData),
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationKey: ["USER_CREATE"],
    mutationFn: async (userData: { token: string; activateCode: string }) =>
      await verifyUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: { email: string; password: string }) =>
      await logInUser(userData),
  });
};

export const useUpdateDealer = () => {
  return useMutation({
    mutationKey: ["DEALER_UPDATE"],
    mutationFn: async (payload: { payload: FieldValues; dealerId: string }) =>
      await updateDealerInfo(payload),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CURRENT_USER"],
    queryFn: async () => await currentUser(),
  });
};

export const useGetAllDealer = () => {
  return useQuery({
    queryKey: ["GET_ALL_DEALER"],
    queryFn: async () => await getAllDealers(),
  });
};
export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["GET_ALL_CUSTOMERS"],
    queryFn: async () => await getAllCustomers(),
  });
};

export const useUpdateUserAccount = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER_ACCOUNT"],
    mutationFn: async (payload: FormData) => await updateUserAccount(payload),
  });
};

export const useUpdateToDealer = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER_ROLE"],
    mutationFn: async (id: string) => await updateRole(id),
  });
};
