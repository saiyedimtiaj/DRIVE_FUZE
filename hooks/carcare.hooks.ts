import {
  changeStatusCarCare,
  createCarCare,
  getAllCarCare,
  getSingleCarCare,
  sendCarCareMessage,
} from "@/services/carcare.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateCarCare = () => {
  return useMutation({
    mutationKey: ["CREATE_CARCARE"],
    mutationFn: async (payload: FormData) => await createCarCare(payload),
  });
};

export const useCreateCarCareSendMessage = () => {
  return useMutation({
    mutationKey: ["SEND_MESSAGE"],
    mutationFn: async (payload: {
      id: string;
      payload: {
        name: string;
        role: string;
        message: string;
        time: Date;
      };
    }) => await sendCarCareMessage(payload),
  });
};

export const useGetAllCarCare = () => {
  return useQuery({
    queryKey: ["GET_ALL_CARCARE"],
    queryFn: async () => await getAllCarCare(),
  });
};

export const useGetSingleCarCare = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_CARCARE"],
    queryFn: async () => await getSingleCarCare(id),
  });
};

export const useChangeCarCareStatus = () => {
  return useMutation({
    mutationKey: ["Resolve_Carcare"],
    mutationFn: async (id: string) => await changeStatusCarCare(id),
  });
};
