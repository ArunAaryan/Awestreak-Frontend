import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Navigate, redirect, useNavigate } from "react-router-dom";
export interface IBoardInput {
  name: string;
  description: string;
  image: string;
}
const NewBoard = () => {
  const { register, handleSubmit, watch, formState } = useForm<IBoardInput>();
  // const onSubmit : SubmitHandler<IBoardInput> = (data) =>{}
  const navigate = useNavigate();
  const successHandler = (res) => {
    navigate(`/board/${res.data.id}`);
  };
  const { mutate } = useMutation<IBoardInput>({
    mutationFn: (values) => axiosClient.post(`/board`, values),
    onSuccess: successHandler,
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit(mutate)}
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
