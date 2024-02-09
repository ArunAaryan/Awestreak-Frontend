import Board from "./Board.tsx";
import { useGetAllBoards, useGetMyBoards } from "@/api/boards/boards-api.ts";
import { IBoardProps } from "@/api/boards/boards.types.ts";

interface IBoardList {
  boards: Array<IBoardProps>;
}
const BoardList_: React.FC<IBoardList> = ({ boards }) => {
  return (
    <div className="flex flex-col gap-4">
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
  // const initialData = useLoaderData() as Awaited<
  //   ReturnType<ReturnType<typeof boardListLoader>>
  // >;
  const myBoards = window.location.href.includes("/boards/my") ? true : false;
  console.log(myBoards, "myBoards");
  const { data: boards } = !myBoards ? useGetAllBoards() : useGetMyBoards();
  console.log(boards, "boards");

  if (boards) {
    return <BoardList_ boards={boards} />;
  }
};
export default BoardList;
