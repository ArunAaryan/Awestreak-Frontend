import axiosClient from "@/axios";
import {
  QueryClient,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { boardQueryKeys } from "./boards.keys";
import { useNavigate, useParams } from "react-router-dom";
import { IBoardInput } from "@/Boards/NewBoard";
import { IBoardProps, IStreak } from "./boards.types";
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

export function useGetAllBoards(initialData: any) {
  return useQuery<Array<IBoardProps>>({
    queryKey: boardQueryKeys.all,
    queryFn: getAllBoards,
    staleTime,
    initialData,
  });
}
export function useGetMyBoards(initialData: any) {
  return useQuery<Array<IBoardProps>>({
    queryKey: boardQueryKeys.my,
    queryFn: getMyBoards,
    staleTime,
    initialData,
  });
}
export function useGetBoardDetail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("Board ID is not provided.");
  }
  return useQuery<IBoardProps>({
    queryKey: boardQueryKeys.detail(id),
    queryFn: () => getBoardById(id),
    staleTime,
  });
}
export const boardListLoaderAll = (queryClient: QueryClient) => () => {
  console.log("boardlistall all");
  return queryClient.fetchQuery({
    ...getAllBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });
};

export const boardListLoaderMy = (queryClient: QueryClient) => () => {
  console.log("boardListmy loader");
  return queryClient.fetchQuery({
    ...getMyBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });
};

export const createBoard = async (boardData: IBoardInput) => {
  const res = await axiosClient.post("/boards", boardData);
  return res.data;
};

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBoard,
    onMutate: async () => await queryClient.cancelQueries(boardQueryKeys.all),
    onSuccess: (data) => navigate(`/boards/${data.id}`),
  });
}

export const joinBoard = async (boardId: string) => {
  const res = await axiosClient.post(`boards/${boardId}/join`);
  return res.data;
};

export function useJoinBoard() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinBoard,
    onMutate: async (boardDetail) => {
      console.log(boardDetail, "boardDetail onMutate");
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    },
    onSuccess: async (boardDetail) => {
      await queryClient.setQueryData(
        boardQueryKeys.detail(boardDetail.id),
        boardDetail,
      );
    },
  });
}
export const leaveBoard = async (boardId: string) => {
  const res = await axiosClient.delete(`boards/${boardId}/join`);
  return res.data;
};
export function useLeaveBoard() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveBoard,
    onMutate: async (boardDetail) => {
      console.log(boardDetail, "boardDetail onMutate");
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    },
    onSuccess: async (boardDetail) => {
      await queryClient.setQueryData(
        boardQueryKeys.detail(boardDetail.id),
        boardDetail,
      );
    },
  });
}
export const editBoard = async (boardData: IBoardInput) => {
  const res = await axiosClient.put(`boards/${boardData.id}`, boardData);
  return res.data;
};

export function useEditBoard() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editBoard,
    onMutate: async () => {
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    },
    onSuccess: (data) => navigate(`/boards/${data.id}`),
  });
}
