import { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { getLogs, useGetLogs } from "../api/boards/boards-api";
import { ILog } from "../api/boards/boards.types";
import { Button } from "@/components/ui/button";

const LogListCalendarDrawer = ({ streakId }: { streakId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logs, setLogs] = useState<Array<ILog> | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [viewDate, setViewDate] = useState<Date | null>(null);
  const showLogOnViewDate = () => {
    if (viewDate) {
      return logs?.filter((log) => {
        return (
          new Date(log.created_at).toDateString() === viewDate.toDateString()
        );
      });
    }
    return null;
  };
  // const { data: logs, isLoading } = useGetLogs(streakId, 100);
  const handleLogs = async (
    streakId: string,
    limit?: number,
    from?: Date,
    to?: Date
  ) => {
    // change this limit by pagination calendar
    const logData = await getLogs(streakId, (limit = 3), from, to);
    if (logData) {
      const dates = logData?.map((log: ILog) => new Date(log.created_at));
      setLogs(logData);
      setDates(dates);
    }
    setViewDate(new Date());
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleLogs(streakId, 30)}
          >
            Log List
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <div className="flex flex-col  gap-2 items-center justify-center  ">
            <Calendar
              mode="multiple"
              selected={dates}
              onDayClick={() => {
                console.log("hai");
              }}
              onMonthChange={(date) => {
                console.log("prev");
                console.log(date);
                const from = new Date(date);
                from.setHours(0, 0, 0, 0);
                const to = new Date();
                to.setDate(to.getDate() + 30);
                handleLogs(streakId, 30, from, to);
              }}
              onDayFocus={(date) => {
                // console.log(date);
                setViewDate(date);
              }}
            />
            <div className="flex flex-col gap-2  ">
              {viewDate &&
                showLogOnViewDate()?.map((log) => (
                  <div
                    key={log.id}
                    className={`flex flex-col justify-start items-start border p-2 rounded-md w-[230px] transition-all duration-300 ease-in-out`}
                  >
                    <h5 className="text-muted-foreground text-xl">
                      {log.description}
                    </h5>
                    <p className="text-muted-foreground text-xs">
                      {new Date(log.created_at).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "Asia/Kolkata",
                      })}
                      ,{" "}
                      {new Date(log.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogListCalendarDrawer;
