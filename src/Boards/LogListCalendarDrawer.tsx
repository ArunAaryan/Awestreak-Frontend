import { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { getLogs } from "../api/boards/boards-api";
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
  const handleLogs = async (streakId: string) => {
    // change this limit by pagination calendar
    const logData = await getLogs(streakId, 100);
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
            onClick={() => handleLogs(streakId)}
          >
            Log List
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-center ">
            <Calendar
              mode="multiple"
              selected={dates}
              onDayFocus={(date) => {
                // console.log(date);
                setViewDate(date);
              }}
            />
            <div className="flex flex-col gap-2 md:mt-7">
              {viewDate &&
                showLogOnViewDate()?.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col justify-start items-start border p-2 rounded-md w-[230px]"
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
