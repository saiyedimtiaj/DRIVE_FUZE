import {
  createReturnDetails,
  getReturnDetails,
} from "@/services/return.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateReturnDetails = () => {
  return useMutation({
    mutationKey: ["CREATE_RETURN"],
    mutationFn: async (payload: FormData) => await createReturnDetails(payload),
  });
};

export const useGetSingleReturnDetails = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_RETURN_DETAILS"],
    queryFn: async () => await getReturnDetails(id),
  });
};
