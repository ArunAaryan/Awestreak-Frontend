import axiosClient from "@/axios";
import { useQuery } from "react-query";

export const getCurrentUser = async (id: string) => {
  const res = await axiosClient.get(`/users/${id}`);
  return res.data;
};

export const useGetCurrentUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getCurrentUser(id),
  });
};
