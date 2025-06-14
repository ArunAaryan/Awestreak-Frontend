import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import { IBoardProps } from "../api/boards/boards.types";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { boardQueryKeys } from "../api/boards/boards.keys";
import { API_URL } from "../../config";
import axiosClient from "../axios";
import { toast } from "sonner";
import { useGetCurrentUser } from "../api/users/users-api";
import { userContext } from "../routes/UserContext";
import { useContext } from "react";
import { useTheme } from "@/components/theme-provider";
import { FaSun, FaMoon } from "react-icons/fa";

const Profile = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<IBoardProps>({});
  const { theme, setTheme } = useTheme();

  const updateuser = async (name: string) => {
    const res = await axiosClient.put(API_URL + "/users", {
      name,
    });
    queryClient.invalidateQueries({ queryKey: boardQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
    toast.success(`Name updated to ${res.data?.name} successfully`);
  };

  const userId = useContext(userContext);
  const { data: user } = useGetCurrentUser(userId);
  console.log(user);

  return (
    <div className="flex flex-col gap-4 max-w-sm mt-10 ">
      <div className="flex items-center gap-4 w-full justify-between">
        <img
          src={user?.image}
          alt="profile"
          className="w-full object-cover h-32  rounded-md"
        />
        <div className="flex flex-col gap-2 mr-5">
          <p className="text-foreground text-2xl font-bold">{user?.name}</p>
          <p className="text-foreground text-sm ">{user?.email}</p>
          <p className="text-foreground text-sm ">
            {new Date(user?.date_joined).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="self-end"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </Button>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => updateuser(data.name))}
      >
        <Input
          {...register("name")}
          defaultValue={user?.name}
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
