import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "@/services/blog.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useGetAllBlog = () => {
  return useQuery({
    queryKey: ["GET_BLOGS_ALL"],
    queryFn: async () => await getAllBlogs(),
  });
};

export const useCreateBlog = () => {
  return useMutation({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async (payload: FieldValues) => await createBlog(payload),
  });
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationKey: ["UPDATE_BLOG"],
    mutationFn: async (payload: { id: string; payload: FieldValues }) =>
      await updateBlog(payload),
  });
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: async (id: string) => await deleteBlog(id),
  });
};

//   export const useGetSingleCars = (id: string) => {
//     return useQuery({
//       queryKey: ["GET_SINGLE_CARS", id],
//       queryFn: async () => await getSingleCar(id),
//     });
//   };
