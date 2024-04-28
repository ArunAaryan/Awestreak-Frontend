import React, { createContext, useState } from "react";

export const loaderContext = createContext({
  loading: false,
  setLoading: (_: boolean) => {},
});
