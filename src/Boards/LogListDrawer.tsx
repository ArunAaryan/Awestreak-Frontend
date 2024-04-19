import { getLogs } from "@/api/boards/boards-api";
import { ILog } from "@/api/boards/boards.types";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import React, { useState } from "react";

interface IlogListDrawerProps {
  streakId: string;
}
const LogListDrawer: React.FC<IlogListDrawerProps> = ({ streakId }) => {
  const [logs, setLogs] = useState<Array<ILog> | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleLogs = async (streakId: string) => {
    const logData = await getLogs(streakId);
    if (logData) {
      setLogs(logData);
    }
    setLogs(logData);
    setIsDrawerOpen(true);
  };
  return (
    <div className="">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <button
          className="oinline-flex  flex-nowrap text-gray-50 text-xs border border-gray-100 px-2  py-1.5 rounded-md  opacity-100 hover:border-gray-500"
          onClick={() => handleLogs(streakId)}
        >
          Show Logs
        </button>
        <DrawerContent className="flex gap-2 md:max-w-xl self-center items-center m-auto p-2">
          <DrawerHeader>
            <DrawerTitle>Log History</DrawerTitle>
          </DrawerHeader>
          {(!logs || !logs?.length) && (
            <p className="text-gray-100 text-md ">No logs found </p>
          )}
          {logs?.map((log) => (
            <div
              key={log.id}
              className="flex justify-between w-full px-2 mb-4 "
            >
              <p className="text-gray-100 text-md line-clamp-1">
                {log.description}
                {log.description}
                {log.description}
                {log.description}
                {log.description}
              </p>
              <p className="text-gray-500 text-sm ml-2 shrink-0">
                {/* {log.createdAt} */}
                {new Date(log.created_at).toDateString()}
              </p>
            </div>
          ))}
          {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LogListDrawer;
