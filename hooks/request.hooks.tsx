import {
  createRequest,
  getAllRequest,
  getDealerRequest,
  getRequestDetails,
  getSingleRequest,
  getUserRequest,
  updateRequest,
} from "@/services/request.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useCreateRequest = () => {
  return useMutation({
    mutationKey: ["CREATE_REQUEST"],
    mutationFn: async (payload: FieldValues) => await createRequest(payload),
  });
};

export const useUpdateRequest = () => {
  return useMutation({
    mutationKey: ["UPDATE_REQUEST"],
    mutationFn: async (payload: { id: string; payload: FieldValues }) =>
      await updateRequest(payload),
  });
};

export const useGetSingleRequestsQuery = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_REQUSET"],
    queryFn: async () => await getSingleRequest(id),
  });
};

export const useGetUserRequestsQuery = () => {
  return useQuery({
    queryKey: ["GET_USER_REQUSETS"],
    queryFn: async () => await getUserRequest(),
  });
};

export const useGetDealerRequestsQuery = () => {
  return useQuery({
    queryKey: ["GET_DEALER_REQUSETS"],
    queryFn: async () => await getDealerRequest(),
  });
};

export const useGetAllRequest = () => {
  return useQuery({
    queryKey: ["ALL_REQUSETS"],
    queryFn: async () => await getAllRequest(),
  });
};

export const useGetUserRequestDetails = (id: string) => {
  return useQuery({
    queryKey: ["USER_REQUEST_DETAILS"],
    queryFn: async () => await getRequestDetails(id),
  });
};
