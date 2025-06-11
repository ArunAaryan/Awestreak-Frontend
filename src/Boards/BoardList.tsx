import Board from "./Board.tsx";
import {
  boardListLoaderAll,
  boardListLoaderMy,
  useGetAllBoards,
  useGetMyBoards,
} from "@/api/boards/boards-api.ts";
import { IBoardProps } from "@/api/boards/boards.types.ts";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loaderContext } from "../LoaderContext.ts";

interface IBoardList {
  boards: Array<IBoardProps>;
}

const BoardList_: React.FC<IBoardList> = ({ boards }) => {
  return (
    <div className="flex flex-col gap-4">
      {boards &&
        boards.map((board: IBoardProps, index: number) => (
          <div
            key={board.id}
            className="transform transition-all duration-500 ease-in-out"
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

const BoardList = () => {
  const { setLoading } = useContext(loaderContext);
  const [isVisible, setIsVisible] = useState(false);
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof boardListLoaderMy>>
  >;
  const initialData2 = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof boardListLoaderAll>>
  >;
  const myBoards = window.location.href.includes("/boards/my") ? true : false;
  const { data: boards, isLoading } = !myBoards
    ? useGetAllBoards(initialData2)
    : useGetMyBoards(initialData);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      setIsVisible(false);
    } else {
      setLoading(false);
      setIsVisible(true);
    }
  }, [isLoading, setLoading]);

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
      className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <p className="text-foreground text-xl">
        You have not joined any board yet!
      </p>
    </div>
  );
};

export default BoardList;
