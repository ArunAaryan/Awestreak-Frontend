import Board from "./Board.tsx";
import {
  boardListLoaderAll,
  boardListLoaderMy,
  useGetAllBoards,
  useGetMyBoards,
} from "@/api/boards/boards-api.ts";
import { IBoardProps } from "@/api/boards/boards.types.ts";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { loaderContext } from "../LoaderContext.ts";

interface IBoardList {
  boards: Array<IBoardProps>;
}
const BoardList_: React.FC<IBoardList> = ({ boards }) => {
  return (
    <div className="flex flex-col gap-4 transition-all duration-500 ease-in-out">
      {boards &&
        boards.map((board: IBoardProps) => (
          <Board
            {...board}
            numberOfPeople={board?.Streak?.length ?? 0}
            key={board.id}
          />
        ))}
    </div>
  );
};
const BoardList = () => {
  const { setLoading } = useContext(loaderContext);
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
    } else {
      setLoading(false);
    }
  }, [isLoading]);
  if (boards && boards.length > 0) {
    return (
      <div className="transition-all duration-500 ease-in-out">
        <BoardList_ boards={boards} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-50 text-xl">You have not joined any board yet!</p>
    </div>
  );
};
export default BoardList;
