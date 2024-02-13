import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import UserView from "./UserView";
import {
  useGetBoardDetail,
  useJoinBoard,
  useLeaveBoard,
} from "@/api/boards/boards-api";
import { IStreak, IUser } from "@/api/boards/boards.types";
import { useContext } from "react";
import { userContext } from "@/routes/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

// there is a hook problem useRequestProcessor() cannot be used; change this
const BoardDetail = () => {
  const { data: board } = useGetBoardDetail();

  const joinBoard = useJoinBoard();

  const leaveBoard = useLeaveBoard();

  const userCount = board?.Streak?.length ?? 0;

  const getUsers = (streakArray: Array<IStreak>) => {
    let users: Array<IUser> = streakArray.map((streak) => {
      let user = streak.User;
      user.current_streak = streak.current_streak ?? 0;
      return user;
    });
    return users;
  };
  // put this in useCallback
  const userId = useContext(userContext);
  const getUserJoinStatus = board?.Streak?.map((user) => user.userId).find(
    (user) => user === userId,
  );
  const isCurrentUserBoardAdmin = getUserJoinStatus ? board?.userId : undefined;
  return (
    <div className="">
      {board && (
        <>
          <div className="relative h-[20vh] w-[100%] rounded-md transition-all duration-1000 ease-in-out">
            <img
              src={board?.image}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out"
              style={{ filter: "blur(2px) brightness(0.6)" }}
            />
            <div className="absolute top-0 left-0 h-[100%] w-[100%] flex  justify-between p-2">
              <div className="flex flex-col justify-end">
                <h2 className="text-gray-100 text-lg">{board?.name}</h2>
                <h2 className="text-gray-100 opacity-40 text-xs">
                  {board?.description}
                </h2>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div>
                  {!getUserJoinStatus && (
                    <button
                      className="flex text-gray-100 text-xs border-2 border-gray-100 px-2 my-1 py-0.5 rounded-md max-w-min"
                      onClick={() => joinBoard.mutate(board?.id)}
                    >
                      join
                    </button>
                  )}
                  {getUserJoinStatus && (
                    <button
                      className="flex text-gray-50 text-xs border-2 border-gray-100 px-2 my-1.5 py-0.5 rounded-md max-w-min opacity-100"
                      onClick={() => leaveBoard.mutate(board?.id)}
                    >
                      leave
                    </button>
                  )}
                  {isCurrentUserBoardAdmin && (
                    <Popover>
                      <PopoverTrigger>
                        <p
                          className="text-gray-50 text-xs border-2 border-gray-100 px-2 my-1.5 py-.5 rounded-md max-w-min"
                          tabIndex={-1}
                        >
                          manage
                        </p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <AdminUserActions />
                      </PopoverContent>
                    </Popover>
                  )}
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
const AdminUserActions: React.FC = () => {
  return (
    <div className="flex gap-2 flex-col relative h-20 w-20 ">
      <div className="flex gap-2 flex-col  bg-white/10  absolute  top-0  left-0 h-20 w-20 backdrop-blur rounded-sm "></div>
      <div className="absolute z-10 translate-x-0 translate-y-0 m-2 flex flex-col gap-2 p-2">
        <button className="flex text-xs bg-transparent    text-black py-0.5 px-2 bg-red-200 rounded-sm">
          Delete
        </button>
        <button className="flex text-xs bg-transparent    text-black py-0.5 px-2 bg-cyan-200 rounded-sm">
          Edit
        </button>
      </div>
    </div>
  );
};
export default BoardDetail;
