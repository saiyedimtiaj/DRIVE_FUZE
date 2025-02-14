import {
  addCustomerComment,
  getSinglePrep,
  setAwatingDelivery,
  setEarlyPrepDate,
  setSeduleDate,
  updatePrepration,
} from "@/services/prep.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSinglePreparetion = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_PREPARETION", id],
    queryFn: async () => await getSinglePrep(id),
  });
};

export const useSetEarlyPrepDate = () => {
  return useMutation({
    mutationKey: ["EARLY_PREP_DATE"],
    mutationFn: async (payload: {
      id: string;
      payload: { date: string; status: string };
    }) => await setEarlyPrepDate(payload),
  });
};

export const useSetSeduleDate = () => {
  return useMutation({
    mutationKey: ["SET_SEDULE_DATE"],
    mutationFn: async (payload: { id: string; date: string }) =>
      await setSeduleDate(payload),
  });
};

export const useUpdatePrep = () => {
  return useMutation({
    mutationKey: ["UDATE_PREPARETION"],
    mutationFn: async (payload: { id: string; formData: FormData }) =>
      await updatePrepration(payload),
  });
};

export const useSetAwatingDelivery = () => {
  return useMutation({
    mutationKey: ["EARLY_PREP_DATE"],
    mutationFn: async (payload: { id: string; payload: { status: string } }) =>
      await setAwatingDelivery(payload),
  });
};

export const useAddCustomerComment = () => {
  return useMutation({
    mutationKey: ["CUSTOMER_COMMENT"],
    mutationFn: async (payload: { id: string; customerComment: string }) =>
      await addCustomerComment(payload),
  });
};
