import Board from "./Board.tsx";
import {
  useGetAllBoards,
  useGetMyBoards,
  useGetPrivateBoards,
} from "@/api/boards/boards-api.ts";
import { IBoardProps } from "@/api/boards/boards.types.ts";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loaderContext } from "../LoaderContext.ts";
import Loader from "@/components/ui/Loader";

interface IBoardList {
  boards?: Array<IBoardProps>;
  privateOnly?: boolean;
}

const BoardList_: React.FC<IBoardList> = ({ boards }) => {
  return (
    <div className="flex flex-col gap-4">
      {boards &&
        boards.map((board: IBoardProps, index: number) => (
          <div
            key={board.id}
            className="transform transition-all duration-500 ease-in-out "
            style={{
              opacity: 1,
              transform: "translateY(0)",
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <Board {...board} numberOfPeople={board?.Streak?.length ?? 0} />
          </div>
        ))}
    </div>
  );
};

const BoardList = ({ type }: { type: "all" | "my" | "private" }) => {
  const { setLoading } = useContext(loaderContext);
  const [isVisible, setIsVisible] = useState(false);
  const initialData = useLoaderData();

  // Call all hooks at the top level
  const allBoards = useGetAllBoards(initialData);
  const myBoards = useGetMyBoards(initialData);
  const privateBoards = useGetPrivateBoards(initialData);

  let boards: IBoardProps[] | undefined;
  let isLoading: boolean = false;
  if (type === "all") {
    boards = allBoards.data;
    isLoading = allBoards.isLoading;
  } else if (type === "my") {
    boards = myBoards.data;
    isLoading = myBoards.isLoading;
  } else if (type === "private") {
    boards = privateBoards.data;
    isLoading = privateBoards.isLoading;
  }

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      setIsVisible(false);
    } else {
      setLoading(false);
      setIsVisible(true);
    }
  }, [isLoading, setLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (boards && boards.length > 0) {
    return (
      <div
        className={`transform transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <BoardList_ boards={boards} />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out pt-10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <img
        src="/awestreak_logo.png"
        alt="No boards"
        className="w-32 h-32 mb-4 opacity-80"
      />
      <h3 className="text-foreground text-xl font-semibold mb-2">
        You have not joined any board yet!
      </h3>
      <p className="text-muted-foreground text-sm text-center max-w-xs">
        Boards help you track your streaks and collaborate with others. Create
        or join a board to get started!
      </p>
    </div>
  );
};

export default BoardList;
