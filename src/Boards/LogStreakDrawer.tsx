import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const LogStreakDrawer = () => {
  return (
    <div className="flex mt-4 justify-end ">
      <Drawer>
        <DrawerTrigger>
          <button
            className="inline-flex  flex-nowrap text-gray-50 text-xs border border-gray-100 px-2  py-1.5 rounded-md  opacity-100 hover:border-gray-500"
            // onClick={() => updateStreak.mutate(getUserJoinStatus?.id)}
          >
            MarkStreak
          </button>
        </DrawerTrigger>
        <DrawerContent className="flex md:justify-center md:items-center">
          <div className="flex justify-start  w-auto md:w-full md:max-w-lg flex-col gap-2 mb-5 mx-2">
            <DrawerHeader>
              <DrawerTitle>Log Streak</DrawerTitle>
              <DrawerDescription>
                Log your streak to get points
              </DrawerDescription>
            </DrawerHeader>
            <Textarea
              className="min-h-[25vh]"
              placeholder="Enter some description"
            />
            <Button variant="default">Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LogStreakDrawer;
