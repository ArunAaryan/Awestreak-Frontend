import { useQuery } from "react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import UserView from "./UserView";
import {
  deleteBoard,
  useDeleteBoard,
  useGetBoardDetail,
  useJoinBoard,
  useLeaveBoard,
} from "@/api/boards/boards-api";
import { IBoardProps, IStreak, IUser } from "@/api/boards/boards.types";
import { Suspense, useContext } from "react";
import { userContext } from "@/routes/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";

// there is a hook problem useRequestProcessor() cannot be used; change this
const BoardDetail = () => {
  const { data: board, isLoading } = useGetBoardDetail();
  console.log(board?.name, "boardName");

  const joinBoard = useJoinBoard();

  const leaveBoard = useLeaveBoard();

  const userCount = board?.Streak?.length ?? 0;
  const getUsers = (streakArray: Array<IStreak>) => {
    let users: Array<IUser> = [];
    streakArray.forEach((streak) => {
      if (streak?.User) {
        let user = streak?.User;
        user.current_streak = streak?.current_streak ?? 0;
        users.push(user);
      }
    });
    return users;
  };
  // put this in useCallback
  const userId = useContext(userContext);
  const getUserJoinStatus = board?.Streak?.map((user) => user.userId).find(
    (user) => user === userId,
  );
  const isCurrentUserBoardAdmin = userId === board?.userId;
  if (isLoading) return <Loader />;

  return (
    <Suspense fallback={<div className=""> suspense</div>}>
      <Dialog>
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
                <div className="absolute top-0 left-0 h-[100%] w-[100%] flex  justify-between p-2 gap-2">
                  <div className="flex flex-col justify-end">
                    <h2 className="text-gray-100 text-lg">{board?.name}</h2>
                    <h2 className="text-gray-100 opacity-40 text-xs">
                      {board?.description}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end justify-between whitespace-nowrap">
                    <div>
                      {!getUserJoinStatus && (
                        <button
                          className="flex text-gray-100 text-xs border border-gray-100 px-2 my-1 py-0.5 rounded-md max-w-min"
                          onClick={() => joinBoard.mutate(board?.id)}
                        >
                          join
                        </button>
                      )}
                      {getUserJoinStatus && (
                        <button
                          className="flex text-gray-50 text-xs border border-gray-100 px-2 my-1.5 py-0.5 rounded-md max-w-min opacity-100"
                          onClick={() => leaveBoard.mutate(board?.id)}
                        >
                          leave
                        </button>
                      )}

                      {isCurrentUserBoardAdmin && (
                        <Popover>
                          <PopoverTrigger>
                            <p
                              className="text-gray-50 text-xs border border-gray-100 px-2 my-1.5 py-1 rounded-md max-w-min"
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
