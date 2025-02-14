import {
  createSubscription,
  getAdminDashboardData,
  getCurrentSubscription,
  getDealerDashboardData,
  getSingleSubscriptions,
  getSubscriptions,
} from "@/services/subscription.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateSubsctiption = () => {
  return useMutation({
    mutationKey: ["CREATE_SUBSCRIPTION"],
    mutationFn: async (payload: { deliveryId: string }) =>
      await createSubscription(payload),
  });
};

export const useGetAllSubscription = () => {
  return useQuery({
    queryKey: ["SUBSCRIPTION"],
    queryFn: async () => await getSubscriptions(),
  });
};

export const useGetSingleSubscription = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_SUBSCRIPTION"],
    queryFn: async () => await getSingleSubscriptions(id),
  });
};

export const useGetAdminDashboardData = () => {
  return useQuery({
    queryKey: ["ADMIN_DASHBOARD"],
    queryFn: async () => await getAdminDashboardData(),
  });
};

export const useGetDealerDashboardData = () => {
  return useQuery({
    queryKey: ["DEALER_DASHBOARD"],
    queryFn: async () => await getDealerDashboardData(),
  });
};

export const useGetCurrentSubscription = () => {
  return useQuery({
    queryKey: ["CURRENTSUBSCRIPTION"],
    queryFn: async () => await getCurrentSubscription(),
  });
};
