import { useEditBoard, useGetBoardDetail } from "@/api/boards/boards-api";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IBoardProps } from "@/api/boards/boards.types";
import { useContext, useEffect } from "react";
import { loaderContext } from "../LoaderContext";
import { Checkbox } from "@/components/ui/checkbox";

export interface IBoardInput {
  name: string;
  description: string;
  image: string;
  isPrivate?: boolean;
}

const EditBoard = () => {
  const getBoard = useGetBoardDetail();
  const { register, handleSubmit, setValue, control } = useForm<IBoardProps>(
    {}
  );
  const board = getBoard.data;
  useEffect(() => {
    if (board) {
      const keys = [
        "name",
        "description",
        "image",
        "isPrivate",
      ] as (keyof IBoardProps)[];
      keys.forEach((key) => {
        setValue(key, board[key]);
      });
    }
  }, [board, setValue]);
  const { setLoading } = useContext(loaderContext);
  const editUser = useEditBoard(setLoading);
  return (
    <div>
      <form
        onSubmit={handleSubmit(editUser.mutate as any)}
        className="flex flex-col gap-4"
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
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="isPrivate"
            render={({ field: { value, onChange } }) => (
              <>
                <Checkbox
                  id="private"
                  checked={!!value}
                  onCheckedChange={onChange}
                />
                <label htmlFor="private" className="text-sm">
                  Private Board
                </label>
              </>
            )}
          />
        </div>
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditBoard;
