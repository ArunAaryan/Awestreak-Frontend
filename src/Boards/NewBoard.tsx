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
import { loaderContext } from "../LoaderContext";
import { useContext, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface IBoardInput {
  id?: string;
  name: string;
  description: string;
  image: string;
  period?: "EVERYDAY" | "WEEKLY" | "MONTHLY";
  frequency?: number;
  isPrivate?: boolean;
}

const BoardSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  image: z.string().url({ message: "Image must be a valid URL." }),
  period: z.enum(["EVERYDAY", "WEEKLY", "MONTHLY"]),
  frequency: z
    .union([z.number(), z.string()])
    .optional()
    .refine(
      (val: number | string | undefined) => {
        if (val === undefined || val === "") return true;
        return !isNaN(Number(val)) && Number(val) > 0;
      },
      { message: "Frequency must be a positive number." }
    ),
  isPrivate: z.boolean().optional(),
});

const NewBoard = () => {
  const { setLoading } = useContext(loaderContext);
  const createBoard = useCreateBoard(setLoading);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const form = useForm<z.infer<typeof BoardSchema>>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      period: "EVERYDAY",
      frequency: undefined,
      isPrivate: false,
    },
  });
  const currentPeriod = form.watch("period");
  const onSubmit = (data: z.infer<typeof BoardSchema>) => {
    createBoard.mutate({
      ...data,
      frequency: data.frequency ? Number(data.frequency) : undefined,
    });
  };
  return (
    <div
      className={`flex flex-col gap-4 transform transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Step Out Often" {...field} />
                </FormControl>
                <FormDescription>Enter the name of your board.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Stepping out often can be a great way to get some fresh air and exercise."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe what this board is about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.png"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a valid image URL for your board.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-8">
            <FormField
              control={form.control}
              name="period"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Streak Rule</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Every Day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EVERYDAY">Every Day</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose how often the streak should be tracked.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {currentPeriod && currentPeriod !== "EVERYDAY" && (
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>
                      {currentPeriod === "MONTHLY"
                        ? "Days in a Month"
                        : "Days in a Week"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-40"
                        placeholder={`ex: 2`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number of days required in the selected period.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col md:flex-row  gap-2 space-y-0">
                <div className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="isPrivate"
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="isPrivate" className="text-sm">
                    Private Board
                  </FormLabel>
                </div>
                <FormDescription>
                  If checked, only you can view this board.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">
            Create Board
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewBoard;
