import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "@/services/news.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllNews = () => {
  return useQuery({
    queryKey: ["GET_NEWS"],
    queryFn: async () => await getAllNews(),
  });
};

export const useCreateNews = () => {
  return useMutation({
    mutationKey: ["CREATE_NEWS"],
    mutationFn: async (payload: FormData) => await createNews(payload),
  });
};

export const useUpdateNews = () => {
  return useMutation({
    mutationKey: ["UPDATE_NEWS"],
    mutationFn: async (payload: { id: string; payload: FormData }) =>
      await updateNews(payload),
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationKey: ["DELETE_NEWS"],
    mutationFn: async (id: string) => await deleteNews(id),
  });
};
