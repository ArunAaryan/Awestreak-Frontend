import { useCreateLog } from "@/api/boards/boards-api";
import { ILog, IStreak } from "@/api/boards/boards.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loaderContext } from "../LoaderContext";

interface ILogStreakDialogProps {
  userStreak: IStreak;
}

const LogStreakDialog: React.FC<ILogStreakDialogProps> = ({
  userStreak: getUserJoinStatus,
}) => {
  const { id: streakId } = getUserJoinStatus;
  const { handleSubmit, register } = useForm<ILog>();
  const { setLoading } = useContext(loaderContext);
  const createLog = useCreateLog(setLoading);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const onSubmit: SubmitHandler<ILog> = (data) => {
    // createUser.mutate(data);: streakId
    data = { ...data, streakId };
    createLog.mutate(data, {
      onError: () => setIsDialogOpen(false),
      onSuccess: () => setIsDialogOpen(false),
    });
  };
  return (
    <div className="flex justify-end ">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <DialogTrigger> */}
        <button
          className="inline-flex  flex-nowrap text-gray-50 text-xs border border-gray-100 px-2  py-1.5 rounded-md  opacity-100 hover:border-gray-500"
          onClick={() => setIsDialogOpen(true)}
        >
          Log Streak
        </button>
        {/* </DialogTrigger> */}
        <DialogContent className="flex md:justify-center md:items-center w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex justify-center"
          >
            <div className="flex justify-start w-full md:max-w-lg flex-col gap-4 mx-2">
              <DialogHeader>
                <DialogTitle>Log Streak</DialogTitle>
              </DialogHeader>
              <Textarea
                className="min-h-[25vh]"
                placeholder="Enter some description"
                {...register("description")}
                tabIndex={-1}
              />
              <Button
                variant="default"
                type="submit"
                className=""

                // onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogStreakDialog;
