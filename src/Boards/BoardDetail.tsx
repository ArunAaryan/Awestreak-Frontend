import { useNavigate } from "react-router-dom";
import UserView, { UserViewRow } from "./UserView";
import {
  useDeleteBoard,
  useGetBoardDetail,
  useJoinBoard,
  useLeaveBoard,
} from "@/api/boards/boards-api";
import { IBoardProps, IStreak, IUser } from "@/api/boards/boards.types";
import {
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { userContext } from "@/routes/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverPortal,
} from "@radix-ui/react-popover";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Loader from "@/components/ui/Loader";
// there is a hook problem useRequestProcessor() cannot be used; change this
import { twMerge } from "tailwind-merge";
import { loaderContext } from "../LoaderContext";
import { Button } from "@/components/ui/button";
import BoardProgress from "./BoardProgress";

const BoardDetail = () => {
  const { data: board, isLoading } = useGetBoardDetail();
  const { setLoading } = useContext(loaderContext);
  const [isVisible, setIsVisible] = useState(false);
  const joinBoard = useJoinBoard(setLoading);
  const leaveBoard = useLeaveBoard(setLoading);
  const userCount = board?.Streak?.length ?? 0;
  const userId = useContext(userContext);
  const [interactiveDescription, setInteractiveDescription] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(false);
    } else {
      // Small delay to ensure smooth transition
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [isLoading]);

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

  if (isLoading) return <Loader />;
  return (
    <Suspense fallback={<div className=""> suspense</div>}>
      <Dialog>
        <div
          className={`transform transition-all duration-500 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {board && (
            <>
              <div
                className={twMerge(
                  "relative h-[19vh] w-[100%] rounded-md transition-all duration-600 ease-in-out",
                  interactiveDescription ? "h-[25vh]" : ""
                )}
              >
                <img
                  src={board?.image}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-in-out rounded-md"
                  style={{ filter: "blur(1px) brightness(0.8)" }}
                />
                <div className="absolute top-0 left-0 h-[100%] w-[100%] flex justify-between p-2 gap-2">
                  <div className="flex flex-col justify-end">
                    <h2 className="text-gray-100 text-lg">{board?.name}</h2>
                    <h2
                      className={twMerge(
                        "text-gray-100 opacity-60 text-xs hover:cursor-pointer transition-all duration-300",
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
                    <div className="flex flex-col gap-2">
                      {!userStreak && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => joinBoard.mutate(board?.id)}
                        >
                          Join
                        </Button>
                      )}

                      {(userStreak || isCurrentUserBoardAdmin) && (
                        <Popover>
                          <PopoverTrigger>
                            <Button size="sm" variant="outline" tabIndex={-1}>
                              <HamburgerMenuIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverPortal>
                            <PopoverContent className="bg-background text-foreground shadow-md rounded-md z-50">
                              <BoardActions
                                board={board}
                                userStreak={userStreak}
                                isCurrentUserBoardAdmin={
                                  isCurrentUserBoardAdmin
                                }
                                leaveBoard={leaveBoard}
                              />
                            </PopoverContent>
                          </PopoverPortal>
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
              <div className="transform transition-all duration-500 ease-in-out">
                {userStreak && (
                  <div
                    className="transform transition-all duration-500 ease-in-out"
                    style={{ transitionDelay: "100ms" }}
                  >
                    <UserViewRow
                      user={userStreak.User}
                      userStreak={userStreak}
                    />
                    <BoardProgress userStreak={userStreak} board={board} />
                  </div>
                )}
                {board?.Streak && board?.Streak?.length > 0 && (
                  <div
                    className="transform transition-all duration-500 ease-in-out"
                    style={{ transitionDelay: "200ms" }}
                  >
                    <UserView users={getUsers(board.Streak) ?? []}></UserView>
                  </div>
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

interface BoardActionsProps {
  board: IBoardProps;
  userStreak: IStreak | undefined;
  isCurrentUserBoardAdmin: boolean;
  leaveBoard: any;
}

const BoardActions: React.FC<BoardActionsProps> = ({
  board,
  userStreak,
  isCurrentUserBoardAdmin,
  leaveBoard,
}) => {
  const navigate = useNavigate();
  const deleteBoard = useDeleteBoard();

  return (
    <div className="flex flex-col gap-3 p-4 min-w-[140px] mt-2 bg-card rounded-md">
      {userStreak && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => leaveBoard.mutate(board?.id)}
          className="justify-start"
        >
          Leave Board
        </Button>
      )}

      {isCurrentUserBoardAdmin && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/boards/${board.id}/edit`)}
            className="justify-start"
          >
            Edit Board
          </Button>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="justify-start"
              onClick={() => deleteBoard.mutate(board.id)}
            >
              Delete Board
            </Button>
          </DialogTrigger>
        </>
      )}
    </div>
  );
};
export default BoardDetail;
