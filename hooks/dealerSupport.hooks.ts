import {
  changeStatusDealerSupport,
  createDealerSupport,
  getAllDealerSupport,
  getSingleDealerSupport,
  sendDealerSupportMessage,
} from "@/services/dealerSupport.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useCreateDealerSupport = () => {
  return useMutation({
    mutationKey: ["CREATE_DealerSupport"],
    mutationFn: async (payload: FieldValues) =>
      await createDealerSupport(payload),
  });
};

export const useDealerSupportSendMessage = () => {
  return useMutation({
    mutationKey: ["SEND_MESSAGE_Dealer_Support"],
    mutationFn: async (payload: {
      id: string;
      payload: {
        name: string;
        role: string;
        message: string;
        time: Date;
      };
    }) => await sendDealerSupportMessage(payload),
  });
};

export const useGetAllDealerSupport = () => {
  return useQuery({
    queryKey: ["GET_ALL_DealerSupport"],
    queryFn: async () => await getAllDealerSupport(),
  });
};

export const useGetSingleDealerSupport = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_DealerSupport"],
    queryFn: async () => await getSingleDealerSupport(id),
  });
};

export const useChangeSupportStatus = () => {
  return useMutation({
    mutationKey: ["Resolve_Sopport"],
    mutationFn: async (id: string) => await changeStatusDealerSupport(id),
  });
};
