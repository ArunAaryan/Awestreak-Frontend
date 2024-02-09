import { useCreateBoard } from "@/api/boards/boards-api";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
export interface IBoardInput {
  name: string;
  description: string;
  image: string;
}
const NewBoard = () => {
  const { register, handleSubmit, watch, formState } = useForm<IBoardInput>();

  const createUser = useCreateBoard();
  return (
    <div>
      <form
        onSubmit={handleSubmit(createUser.mutate)}
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
          Create Board
        </Button>
      </form>
    </div>
  );
};

export default NewBoard;
