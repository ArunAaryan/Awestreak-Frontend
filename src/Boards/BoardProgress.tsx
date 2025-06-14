import { Progress } from "../components/ui/progress";
import { IBoardProps, ILog, IStreak } from "../api/boards/boards.types";
import { getLogs, useGetLogs } from "../api/boards/boards-api";
import { useEffect, useState } from "react";
import { Skeleton } from "../components/ui/skeleton";

const BoardProgress = ({
  userStreak,
  board,
}: {
  userStreak: IStreak;
  board: IBoardProps;
}) => {
  const endValue = board.frequency;

  // get last monday previous to today
  const lastMonday = new Date();
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 2);
  lastMonday.setHours(0, 0, 0, 1);
  const to = new Date();

  const { data: logs, isLoading } = useGetLogs(
    userStreak.id,
    100,
    lastMonday,
    to
  );

  const getPeriodName = (period: string) => {
    switch (period) {
      case "DAILY":
        return "day";
      case "WEEKLY":
        return "week";
      case "MONTHLY":
        return "month";
    }
  };
  if (isLoading) return <Skeleton className="h-4 w-full" />;
  return (
    <div className="flex flex-col gap-2">
      <Progress value={(logs.length / Number(endValue)) * 100} />
      <div className="flex justify-between text-sm">
        <h4 className="text-sm font-medium">
          You have logged {logs.length} days required for this{" "}
          {getPeriodName(board.period)}
        </h4>
        <h4 className="text-sm font-medium">
          {logs.length} / {endValue}
        </h4>
      </div>
    </div>
  );
};

export default BoardProgress;
