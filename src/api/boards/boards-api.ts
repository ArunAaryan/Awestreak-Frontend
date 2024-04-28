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
import { IBoardProps, ILog } from "./boards.types";
import { toast } from "sonner";
export const staleTime = Infinity;

export const getBoardById = async (id: string) => {
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
    staleTime: 100 * 60 * 2,
  });
}
export const boardListLoaderAll = (queryClient: QueryClient) => () => {
  return queryClient.fetchQuery({
    ...getAllBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });
};

export const boardListLoaderMy = (queryClient: QueryClient) => () => {
  return queryClient.fetchQuery({
    ...getMyBoardsQuery(),
    staleTime: 1000 * 60 * 2,
  });
};

export const createBoard = async (boardData: IBoardInput) => {
  const res = await axiosClient.post("/boards", boardData);
  return res.data;
};

export function useCreateBoard(setLoading: (isLoading: boolean) => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBoard,
    onMutate: async () => {
      setLoading(true);
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries(boardQueryKeys.all);
    },
    onSuccess: (data) => {
      navigate(`/boards/${data.id}`);
      setLoading(false);
    },
  });
}

export const joinBoard = async (boardId: string) => {
  const res = await axiosClient.post(`boards/${boardId}/join`);
  return res.data;
};

export function useJoinBoard(setLoading: (isLoading: boolean) => void) {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinBoard,
    onMutate: async () => {
      setLoading(true);
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    },
    onSuccess: async (boardDetail) => {
      setLoading(false);
      await queryClient.setQueryData(
        boardQueryKeys.detail(boardDetail.id),
        boardDetail
      );
    },
  });
}
export const leaveBoard = async (boardId: string) => {
  const res = await axiosClient.delete(`boards/${boardId}/join`);
  return res.data;
};
export function useLeaveBoard(setLoading: (isLoading: boolean) => void) {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveBoard,
    onMutate: async () => {
      setLoading(true);
      await queryClient.cancelQueries(boardQueryKeys.all);
      await queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    },
    onSuccess: async (boardDetail) => {
      await queryClient.setQueryData(
        boardQueryKeys.detail(boardDetail.id),
        boardDetail
      );
      await setLoading(false);
    },
  });
}
export const editBoard = async (boardData: IBoardInput) => {
  const res = await axiosClient.put(`boards/${boardData.id}`, boardData);
  return res.data;
};

export const showEditToast = () => toast("Edited Successfully!", {});

export const showDeleteToast = () => toast("Deleted Successfully!", {});
export function useEditBoard(setLoading: (isLoading: boolean) => void) {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: IBoardInput) => editBoard({ id: boardId, ...data }),
    onMutate: () => {
      setLoading(true);
      queryClient.cancelQueries(boardQueryKeys.all);
    },
    onSuccess: (data, _) => {
      queryClient.invalidateQueries(boardQueryKeys.all);
      navigate(`/boards/${data.id}`);
      setLoading(false);
      showEditToast();
    },
  });
}

export const deleteBoard = async (boardId: string) => {
  const res = await axiosClient.delete(`boards/${boardId}`);
  return res.data;
};
export function useDeleteBoard() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteBoard,
    onMutate: () => {
      queryClient.cancelQueries(boardQueryKeys.all);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(boardQueryKeys.all);
      navigate(`/boards/all`);
      showDeleteToast();
    },
  });
}
export const updateStreak = async (boardId: string, streakId: string) => {
  const res = await axiosClient.put(`/boards/${boardId}/updateStreak`, {
    streakId,
  });
  return res.data;
};
export function useUpdateStreak() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (streakId: string) => updateStreak(boardId, streakId),
    onMutate: () => {
      queryClient.cancelQueries(boardQueryKeys.detail(boardId));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(boardQueryKeys.detail(boardId), data);
    },
  });
}

export const createLog = async (boardId: string, logData: ILog) => {
  const res = await axiosClient.post(`/boards/${boardId}/logs`, logData);
  return res.data;
};

export function useCreateLog() {
  const { id: boardId } = useParams<{ id: string }>();
  if (!boardId) {
    throw new Error("Board ID is not provided.");
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (logData: ILog) => createLog(boardId, logData),
    onMutate: () => {
      queryClient.cancelQueries(boardQueryKeys.detail(boardId));
      queryClient.invalidateQueries(boardQueryKeys.detail(boardId));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(boardQueryKeys.detail(boardId), data);
    },
  });
}

export const getLogs = async (streakId: string) => {
  const res = await axiosClient.get(`/logs/${streakId}`);
  return res.data;
};

export function useGetLogs(streakId: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["logs", streakId],
    queryFn: async () => {
      return getLogs(streakId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["logs"], data);
    },
    enabled: false,
  });
}
