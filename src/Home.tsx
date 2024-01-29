import { useEffect, useState } from "react";
import Board, { IBoardProps } from "./Boards/index.tsx";
import { useRequestProcessor } from "./requestProcessor.ts";
import axiosClient from "./axios.ts";
export interface IHomeProps {
  boards: Array<IBoardProps>;
}
const Home = () => {
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
        boards.map((board) => (
          <Board {...board} numberOfPeople={board?.Streak?.length} />
        ))}
    </div>
  );
};

export default Home;
