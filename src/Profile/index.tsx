import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IBoardProps } from "../api/boards/boards.types";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { boardQueryKeys } from "../api/boards/boards.keys";
import { API_URL } from "../../config";
import axiosClient from "../axios";
import { toast } from "sonner";

const Profile = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<IBoardProps>({});

  const updateuser = async (name: string) => {
    const res = await axiosClient.put(API_URL + "/users", {
      name,
    });
    queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    toast.success(`Name updated to ${res.data?.name} successfully`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mt-10">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => updateuser(data.name))}
      >
        <Input
          {...register("name")}
          defaultValue=""
          placeholder="Name"
          name="name"
        />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Profile;
