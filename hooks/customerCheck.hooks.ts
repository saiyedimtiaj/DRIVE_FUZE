import { VerificationStatus } from "@/components/Admin/AssessMentDetails";
import {
  createCustomerCheck,
  getAllCustomerCheck,
  getCustomerCheck,
  getSingleCustomerCheck,
  updateCustomerCheck,
  updateRiskScore,
} from "@/services/customerCheck.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetByRequestCustomerCheck = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_CUSTOMER_CHECK_BY_REQUEST"],
    queryFn: async () => await getSingleCustomerCheck(id),
  });
};

export const useGetAllCustomerCheck = () => {
  return useQuery({
    queryKey: ["GET_ALL_CUSTOMER_CHECK"],
    queryFn: async () => await getAllCustomerCheck(),
  });
};

export const useGetSingleCustomerCheck = (id: string) => {
  return useQuery({
    queryKey: ["GET_ONE_CUSTOMER"],
    queryFn: async () => await getCustomerCheck(id),
  });
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationKey: ["CREATE_CUSTOMER_CHECK"],
    mutationFn: async (payload: FormData) => await createCustomerCheck(payload),
  });
};

export const useUpdateRiskScore = () => {
  return useMutation({
    mutationKey: ["CREATE_CUSTOMER_CHECK"],
    mutationFn: async (payload: { id: string; payload: VerificationStatus }) =>
      await updateRiskScore(payload.payload, payload.id),
  });
};

export const useUpdateCustomerCheck = () => {
  return useMutation({
    mutationKey: ["UPDATE_CUSTOMER_CHECK"],
    mutationFn: async (payload: { id: string; payload: FormData }) =>
      await updateCustomerCheck(payload.payload, payload.id),
  });
};
