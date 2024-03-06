import Board from "./Board.tsx";
import {
  boardListLoaderAll,
  boardListLoaderMy,
  useGetAllBoards,
  useGetMyBoards,
} from "@/api/boards/boards-api.ts";
import { IBoardProps } from "@/api/boards/boards.types.ts";
import { useLoaderData } from "react-router-dom";

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
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof boardListLoaderMy>>
  >;
  const initialData2 = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof boardListLoaderAll>>
  >;
  const myBoards = window.location.href.includes("/boards/my") ? true : false;
  const { data: boards } = !myBoards
    ? useGetAllBoards(initialData2)
    : useGetMyBoards(initialData);

  if (boards) {
    return (
      <div className="transition-all duration-500 ease-in-out">
        <BoardList_ boards={boards} />
      </div>
    );
  }
};
export default BoardList;
