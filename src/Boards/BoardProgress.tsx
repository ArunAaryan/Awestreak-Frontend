import { Progress } from "../components/ui/progress";
import { IBoardProps, IStreak } from "../api/boards/boards.types";
import { useGetLogs } from "../api/boards/boards-api";
import { Skeleton } from "../components/ui/skeleton";

const BoardProgress = ({
  userStreak,
  board,
}: {
  userStreak: IStreak;
  board: IBoardProps;
}) => {
  const endValue = board.frequency || 1;

  const getTimeFrame = (period: "EVERYDAY" | "WEEKLY" | "MONTHLY") => {
    switch (period) {
      case "EVERYDAY":
        const today_start = new Date();
        today_start.setHours(0, 0, 0, 0);
        const today_end = new Date();
        today_end.setHours(23, 59, 59, 999);
        return { from: today_start, to: today_end };

      case "WEEKLY":
        const lastMonday = new Date();
        lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1);
        lastMonday.setHours(0, 0, 0, 1);
        return { from: lastMonday, to: new Date() };

      case "MONTHLY":
        const lastMonth = new Date();
        lastMonth.setDate(1);
        lastMonth.setHours(0, 0, 0, 1);
        return { from: lastMonth, to: new Date() };
    }
  };
  // get last monday previous to today

  const { data: logs, isLoading } = useGetLogs(
    userStreak.id,
    100,
    getTimeFrame(board.period).from,
    getTimeFrame(board.period).to
  );

  const getMessage = (
    period: "EVERYDAY" | "WEEKLY" | "MONTHLY",
    logsLength: number
  ) => {
    switch (period) {
      case "EVERYDAY":
        return logsLength > 0
          ? `You have logged for today!`
          : `You haven't logged for today!`;
      case "WEEKLY":
        return logsLength > 0
          ? `You have logged ${logsLength} ${
              logsLength > 1 ? "days" : "day"
            } required for this week !`
          : `You haven't logged for this week!`;
      case "MONTHLY":
        return logsLength > 0
          ? `You have logged ${logsLength} ${
              logsLength > 1 ? "days" : "day"
            } required for this month !`
          : `You haven't logged for this month!`;
    }
  };
  if (isLoading) return <Skeleton className="h-4 w-full" />;
  return (
    <div className="flex flex-col gap-2">
      <Progress value={(logs.length / Number(endValue)) * 100} />
      <div className="flex justify-between text-sm">
        <p className="text-sm font-medium">
          {getMessage(board.period, logs.length)}
        </p>
        <p className="text-sm font-medium">
          {logs.length} / {endValue}
        </p>
      </div>
    </div>
  );
};

export default BoardProgress;
