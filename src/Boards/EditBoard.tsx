import { useEditBoard, useGetBoardDetail } from "@/api/boards/boards-api";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IBoardProps } from "@/api/boards/boards.types";
import { useContext, useEffect } from "react";
import { loaderContext } from "../LoaderContext";
export interface IBoardInput {
  name: string;
  description: string;
  image: string;
}
const EditBoard = () => {
  const getBoard = useGetBoardDetail();
  const { register, handleSubmit, setValue } = useForm<IBoardProps>({});
  const board = getBoard.data;
  useEffect(() => {
    if (board) {
      const keys = ["name", "description", "image"] as (keyof IBoardProps)[];

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
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditBoard;
