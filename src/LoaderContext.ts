import { createContext } from "react";

export const loaderContext = createContext({
  loading: false,
  setLoading: (_: boolean) => {},
});
