import {
  createInventory,
  getAllCar,
  getDataByRegNo,
  getDealerCar,
  getSingleCar,
  updateCarStatus,
  updateInventory,
} from "@/services/car.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetDataByRegNum = () => {
  return useMutation({
    mutationKey: ["DATA_BY_REG_NO"],
    mutationFn: async (payload: { registrationNumber: string }) =>
      await getDataByRegNo(payload),
  });
};

export const useCreateCar = () => {
  return useMutation({
    mutationKey: ["MAKE_CAR"],
    mutationFn: async (payload: FormData) => await createInventory(payload),
  });
};

export const useUpdateCarStatus = () => {
  return useMutation({
    mutationKey: ["STATUS_UPDATE_CAR"],
    mutationFn: async (payload: { status: string; id: string }) =>
      await updateCarStatus(payload),
  });
};

export const useGetDealerCar = () => {
  return useQuery({
    queryKey: ["SEARCH_PRODUCT"],
    queryFn: async () => await getDealerCar(),
  });
};

export const useGetAllCars = () => {
  return useQuery({
    queryKey: ["GET_CARS"],
    queryFn: async () => await getAllCar(),
  });
};

export const useGetSingleCars = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_CARS", id],
    queryFn: async () => await getSingleCar(id),
  });
};

export const useUpdateCar = () => {
  return useMutation({
    mutationKey: ["UpdateCar"],
    mutationFn: async (payload: { id: string; payload: FormData }) =>
      await updateInventory(payload),
  });
};
