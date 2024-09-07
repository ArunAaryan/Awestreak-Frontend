import React, { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Drawer, DrawerContent } from "../components/ui/drawer";
import { getLogs, useGetLogs } from "../api/boards/boards-api";
import { ILog } from "../api/boards/boards.types";

const LogListCalendarDrawer = ({ streakId }: { streakId: string }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logs, setLogs] = useState<Array<ILog> | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [viewDate, setViewDate] = useState<Date | null>(null);
  const handleViewDate = (date: Date) => {
    setIsDrawerOpen(true);
    setViewDate(date);
  };
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
    const logData = await getLogs(streakId);
    if (logData) {
      const dates = logData?.map((log: ILog) => new Date(log.created_at));
      setLogs(logData);
      setDates(dates);
    }
    setViewDate(new Date());
    setIsDrawerOpen(true);
  };
  return (
    <div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <button
          className="inline-flex  flex-nowrap text-gray-50 text-xs border border-gray-100 px-2  py-1.5 rounded-md  opacity-100 hover:border-gray-500"
          onClick={() => handleLogs(streakId)}
        >
          Log List
        </button>
        <DrawerContent className="flex gap-2 md:max-w-xl self-center items-center m-auto mb-4 p-2">
          <Calendar
            onSelect={(date) => {}}
            mode="multiple"
            selected={dates}
            onDayFocus={(date) => {
              console.log(date);
              setViewDate(date);
            }}
          />
          {viewDate &&
            showLogOnViewDate()?.map((log) => (
              <div
                key={log.id}
                className=" flex flex-col justify-start items-start border border-gray-500 p-2 rounded-md w-[230px]"
              >
                <p className="text- text-gray-100">{log.description}</p>
                <p className="text-gray-100/50 text-xs">
                  {new Date(log.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LogListCalendarDrawer;
