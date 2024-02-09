export const boardQueryKeys = {
  all: ["boards"],
  my: ["boards", "my"],
  details: () => [...boardQueryKeys.all, "detail"],
  detail: (id: string) => [...boardQueryKeys.details(), id],
};
