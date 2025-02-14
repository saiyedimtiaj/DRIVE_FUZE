import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonial,
  updateTestimonial,
} from "@/services/testimonial.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useGetAllTestimonial = () => {
  return useQuery({
    queryKey: ["GET_Testimonial"],
    queryFn: async () => await getAllTestimonial(),
  });
};

export const useCreateTestimonial = () => {
  return useMutation({
    mutationKey: ["CREATE_TESTIMONIAL"],
    mutationFn: async (payload: FieldValues) =>
      await createTestimonial(payload),
  });
};

export const useUpdateTestimonial = () => {
  return useMutation({
    mutationKey: ["UPDATE_Testimonial"],
    mutationFn: async (payload: { id: string; payload: FieldValues }) =>
      await updateTestimonial(payload),
  });
};

export const useDeleteTestimonial = () => {
  return useMutation({
    mutationKey: ["DELETE_Testimonial"],
    mutationFn: async (id: string) => await deleteTestimonial(id),
  });
};
