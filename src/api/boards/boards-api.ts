import axiosClient from "@/axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { boardQueryKeys } from "./boards.keys";
import { useNavigate, useParams } from "react-router-dom";
import { IBoardInput } from "@/Boards/NewBoard";
import { IBoardProps } from "./boards.types";
export const staleTime = Infinity;
export const getBoardById = async (id: string) => {
  console.log(id, "id getBoardById");
  const res = await axiosClient.get(`/boards/${id}?includeStreak=true`);
  return res.data;
};

export const getAllBoards = async () => {
  const res = await axiosClient.get("/boards?joinStreak=true");
  return res.data;
};

export const getMyBoards = async () => {
  const res = await axiosClient.get("/boards/my?joinStreak=true");
  return res.data;
};

export function getMyBoardsQuery() {
  return {
    queryKey: boardQueryKeys.my,
    queryFn: getMyBoards,
  };
}
export function getAllBoardsQuery() {
  return {
    queryKey: boardQueryKeys.all,
    queryFn: getAllBoards,
  };
}
export function getBoardDetailQuery(id: string) {
  console.log(id, "id getBoardDetailQuery");
  return {
    queryKey: boardQueryKeys.detail(id),
    queryFn: () => getBoardById(id),
  };
}

export function useGetAllBoards() {
  return useQuery<Array<IBoardProps>>({
    queryKey: boardQueryKeys.all,
    queryFn: getAllBoards,
    staleTime,
  });
}
export function useGetMyBoards() {
  return useQuery<Array<IBoardProps>>({
    queryKey: boardQueryKeys.my,
    queryFn: getMyBoards,
    staleTime,
  });
}
export function useGetBoardDetail() {
  const { id } = useParams();
  if (!id) {
    console.error("param id is not given");
    return;
  }
  return useQuery({
    queryKey: boardQueryKeys.detail(id),
    queryFn: () => getBoardById(id),
    staleTime,
  });
}
export const boardListLoaderAll = (queryClient: QueryClient) => () =>
  queryClient.fetchQuery({
    ...getAllBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });

export const boardListLoaderMy = (queryClient: QueryClient) => () =>
  queryClient.fetchQuery({
    ...getAllBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });

export const createBoard = async (boardData: IBoardInput) => {
  const res = await axiosClient.post("/boards", boardData);
  return res.data;
};

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBoard,
    onMutate: async () =>
      await queryClient.cancelQueries({ queryKey: boardQueryKeys.all }),
    onSuccess: (data) => navigate(`/boards/${data.id}`),
  });
}
