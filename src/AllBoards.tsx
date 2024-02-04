import { useEffect, useState } from "react";
import Board, { IBoardProps } from "./Boards/index.tsx";
import { useRequestProcessor } from "./requestProcessor.ts";
import axiosClient from "./axios.ts";
export interface IHomeProps {
  boards: Array<IBoardProps>;
}
const AllBoards = () => {
  const { query } = useRequestProcessor();
  const {
    data: boards,
    isLoading,
    isError,
  } = query(
    ["boards"],
    () => axiosClient.get("/boards?joinStreak=true").then((res) => res.data),
    {
      enabled: true,
    },
  );
  console.log("boardData", boards);
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

export default AllBoards;
