import { useCreateBoard } from "@/api/boards/boards-api";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export interface IBoardInput {
  id?: string;
  name: string;
  description: string;
  image: string;
  period?: "EVERYDAY" | "WEEKLY" | "MONTHLY";
  frequency?: number;
}
const NewBoard = () => {
  const { register, handleSubmit, watch, formState, control } =
    useForm<IBoardInput>();

  const createUser = useCreateBoard();
  const onSubmit: SubmitHandler<IBoardInput> = (data) => {
    createUser.mutate(data);
  };
  const currentPeriod = watch("period");
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-gray-50 flex flex-col gap-4"
      >
        <div>
          <Input {...register("name")} defaultValue="" placeholder="Name" />
        </div>
        <Input
          {...register("description")}
          defaultValue=""
          placeholder="Description"
          type="textarea"
        />
        <div>
          <Input
            {...register("image")}
            defaultValue=""
            placeholder="Image URL"
          />
        </div>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="period"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Select onValueChange={onChange}>
                <SelectTrigger className="w-40">
                  <SelectValue
                    placeholder="Streak Rule"
                    defaultValue={"everyday"}
                    itemType="text"
                  >
                    {value?.toLowerCase()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EVERYDAY">Every Day</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {currentPeriod && currentPeriod?.toUpperCase() !== "EVERYDAY" && (
            <Input
              {...register("frequency")}
              className="w-40"
              defaultValue=""
              placeholder={`Days in a ${
                currentPeriod?.toUpperCase() === "MONTHLY" ? "Month" : "Week"
              }`}
            />
          )}
        </div>
        <Button type="submit" variant="outline">
          Create Board
        </Button>
      </form>
    </div>
  );
};

export default NewBoard;
