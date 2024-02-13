import { useEditBoard, useGetBoardDetail } from "@/api/boards/boards-api";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IBoardProps } from "@/api/boards/boards.types";
import { useEffect } from "react";
export interface IBoardInput {
  name: string;
  description: string;
  image: string;
}
const EditBoard = () => {
  const getBoard = useGetBoardDetail();
  console.log(getBoard.data, "getBoard");
  const { register, handleSubmit, watch, formState, setValue } =
    useForm<IBoardProps>({});
  useEffect(() => {
    if (getBoard?.data) {
      // Set form values using setValue
      Object.keys(getBoard?.data).forEach((key) => {
        setValue(key, getBoard.data[key]);
      });
    }
  }, [getBoard.data, setValue]);
  const editUser = useEditBoard();
  return (
    <div>
      <form
        onSubmit={handleSubmit(editUser.mutate)}
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
