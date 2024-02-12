import React from "react";
import Navbar from "../Navbar/index.tsx";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import { userContext as UserContext } from "./UserContext.ts";
const Root = () => {
  const getUserId = () => {
    let user = localStorage.getItem("currentUser");
    return user;
  };
  return (
    <UserContext.Provider value={getUserId() ?? ""}>
      <QueryClientProvider client={queryClient}>
        <div className="flex mx-auto bg-gray-900 min-h-screen justify-center ">
          <div className="flex flex-col gap-4 px-4 md:px-10 py-4 bg-gray-900 min-h-screen max-w-2xl justify-start items-stretch flex-1">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default Root;
