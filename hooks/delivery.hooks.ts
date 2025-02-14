import {
  createDelivery,
  getSingleDelivery,
} from "@/services/delivery.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateDelivery = () => {
  return useMutation({
    mutationKey: ["CREATE_DELIVERY"],
    mutationFn: async (payload: FormData) => await createDelivery(payload),
  });
};

export const useGetSingleDealivery = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_DELIVERY"],
    queryFn: async () => await getSingleDelivery(id),
  });
};
