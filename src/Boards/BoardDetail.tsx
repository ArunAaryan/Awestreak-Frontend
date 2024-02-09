import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import UserView from "./UserView";
import { useGetBoardDetail } from "@/api/boards/boards-api";
import { IStreak, IUser } from "@/api/boards/boards.types";

// there is a hook problem useRequestProcessor() cannot be used; change this
const BoardDetail = () => {
  const { data: board } = useGetBoardDetail();
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
          <div className="relative h-[20vh] w-[100%] rounded-md ">
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
            {board?.Streak && board?.Streak?.length > 0 && (
              <UserView users={getUsers(board.Streak) ?? []}></UserView>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardDetail;
