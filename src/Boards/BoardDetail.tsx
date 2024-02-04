import axiosClient from "@/axios";
import { QueryClient, useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { IBoardProps, IStreak } from ".";
import { useCallback } from "react";
import UserView from "./UserView";
import { IUser } from "@/types";

const boardDetailQuery = (id?: string) => ({
  queryKey: ["boards", "detail", id],
  queryFn: async (): Promise<IBoardProps> =>
    axiosClient.get(`/board/${id}`).then((res) => res.data),
});

export const boardDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    const query = boardDetailQuery(params.id);
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
// there is a hook problem useRequestProcessor() cannot be used; change this
const BoardDetail = () => {
  const params = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const {
    data: board,
    isLoading,
    isError,
  } = useQuery<IBoardProps>({ ...boardDetailQuery(params.id), initialData });
  const userCount = board?.Streak?.length ?? 0;
  const getUsers = (streakArray: Array<IStreak>) => {
    let users: Array<IUser> = streakArray.map((streak) => {
      let user = streak.User;
      user.current_streak = streak.current_streak ?? 0;
      return user;
    });
    return users;
  };
  return (
    <div className="">
      {board && (
        <>
          <div className="relative h-[10vh] w-[100%] rounded-md ">
            <img
              src={board?.image}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "blur(2px) brightness(0.6)" }}
            />
            <div className="absolute top-0 left-0 h-[100%] w-[100%] flex  justify-between p-2">
              <div className="flex flex-col justify-end">
                <h2 className="text-gray-100 text-lg">{board?.name}</h2>
                <h2 className="text-gray-100 opacity-40 text-xs">
                  {board?.description}
                </h2>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-gray-100 text-xs opacity-4">
                  {userCount} users
                </p>
                <p className="text-gray-100 text-xs opacity-4">
                  {new Date(board.created_at).toDateString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            {board.Streak?.length && (
              <UserView users={getUsers(board.Streak) ?? []}></UserView>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardDetail;
