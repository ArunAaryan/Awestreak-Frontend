import { useNavigate } from "react-router-dom";
import UserView, { UserViewRow } from "./UserView";
import {
  useDeleteBoard,
  useGetBoardDetail,
  useJoinBoard,
  useLeaveBoard,
} from "@/api/boards/boards-api";
import { IBoardProps, IStreak, IUser } from "@/api/boards/boards.types";
import { Suspense, useCallback, useContext, useMemo, useState } from "react";
import { userContext } from "@/routes/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Loader from "@/components/ui/Loader";
// there is a hook problem useRequestProcessor() cannot be used; change this
import { twMerge } from "tailwind-merge";
const BoardDetail = () => {
  const { data: board, isLoading } = useGetBoardDetail();

  const joinBoard = useJoinBoard();

  const leaveBoard = useLeaveBoard();

  const userCount = board?.Streak?.length ?? 0;

  const userId = useContext(userContext);

  const getUsers = useCallback(
    (streakArray: Array<IStreak>) => {
      let users: Array<IUser> = [];
      streakArray.forEach((streak) => {
        if (streak?.User) {
          if (streak?.User.id === userId) {
            // continue
          } else {
            let user = streak?.User;
            user.current_streak = streak?.current_streak ?? 0;
            users.push(user);
          }
        }
      });
      return users;
    },
    [board?.Streak]
  );

  // put this in useCallback
  const userStreak = useMemo(() => {
    return board?.Streak?.find((streak) => streak.userId === userId);
  }, [board, userId]);

  const isCurrentUserBoardAdmin = userId === board?.userId;
  const [interactiveDescription, setInteractiveDescription] = useState(false);

  if (isLoading) return <Loader />;
  return (
    <Suspense fallback={<div className=""> suspense</div>}>
      <Dialog>
        <div className="">
          {board && (
            <>
              <div
                className={twMerge(
                  "relative h-[18vh] w-[100%] rounded-md transition-all duration-300 ease-in-out ",
                  interactiveDescription ? "h-[25vh]" : ""
                )}
              >
                <img
                  src={board?.image}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-in-out"
                  style={{ filter: "blur(3px) brightness(0.4)" }}
                />
                <div className="absolute top-0 left-0 h-[100%] w-[100%] flex  justify-between p-2 gap-2">
                  <div className="flex flex-col justify-end">
                    <h2 className="text-gray-100 text-lg">{board?.name}</h2>
                    <h2
                      className={twMerge(
                        "text-gray-100 opacity-60 text-xs hover:cursor-pointer ",
                        interactiveDescription ? "" : "line-clamp-4"
                      )}
                      onClick={() =>
                        setInteractiveDescription(!interactiveDescription)
                      }
                    >
                      {board?.description}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end justify-between whitespace-nowrap">
                    <div>
                      {!userStreak && (
                        <button
                          className="flex text-gray-100 text-xs border border-gray-100 px-2 my-1 py-1 rounded-md max-w-min hover:border-gray-500"
                          onClick={() => joinBoard.mutate(board?.id)}
                        >
                          join
                        </button>
                      )}
                      {userStreak && (
                        <button
                          className="flex text-gray-100 text-xs border border-gray-100 px-2 my-1.5 py-1 rounded-md max-w-min opacity-100 hover:border-gray-500"
                          onClick={() => leaveBoard.mutate(board?.id)}
                        >
                          leave
                        </button>
                      )}

                      {isCurrentUserBoardAdmin && (
                        <Popover>
                          <PopoverTrigger>
                            <p
                              className="text-gray-50 text-xs border border-gray-100 px-2 my-1.5 py-1 rounded-md max-w-min hover:border-gray-500"
                              tabIndex={-1}
                            >
                              manage
                            </p>
                          </PopoverTrigger>
                          <PopoverContent>
                            <AdminUserActions {...board} />
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    <div className="flex flex-col justify-end">
                      {userCount > 0 && (
                        <p className="text-gray-100 text-xs opacity-4">
                          {userCount > 1 ? userCount + " users" : "1 user"}
                        </p>
                      )}
                      <p className="text-gray-100 text-xs opacity-4">
                        {new Date(board.created_at).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* {userStreak && showMarkStreak && (
                <LogStreakDrawer userStreak={userStreak}></LogStreakDrawer>
              )} */}
              <div>
                {userStreak && (
                  <UserViewRow user={userStreak.User} userStreak={userStreak} />
                )}
                {board?.Streak && board?.Streak?.length > 0 && (
                  <UserView users={getUsers(board.Streak) ?? []}></UserView>
                )}
              </div>
              {/* <LogListDrawer streakId={userStreak?.id || ""} /> */}
            </>
          )}
        </div>
      </Dialog>
    </Suspense>
  );
};

const AdminUserActions: React.FC<IBoardProps> = ({ id }) => {
  const navigate = useNavigate();
  const deleteBoard = useDeleteBoard();
  return (
    <div className="flex gap-2 flex-col relative h-20 w-20 justify-center items-center">
      <div className="flex gap-2 flex-col  bg-white/10  absolute  top-0  left-0 h-20 w-20 backdrop-blur rounded-sm "></div>
      <div className=" z-10 translate-x-0 translate-y-0 m-2 flex flex-col gap-2 p-2">
        <DialogTrigger>
          <button
            className="flex text-xs    text-gray-600 font-semibold py-1 px-2 bg-red-200 rounded-sm"
            onClick={() => deleteBoard.mutate(id)}
          >
            Delete
          </button>
        </DialogTrigger>
        <button
          className="flex text-xs    text-gray-600 font-semibold py-1 px-2 bg-cyan-200 rounded-sm"
          onClick={() => navigate(`/boards/${id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
export default BoardDetail;
