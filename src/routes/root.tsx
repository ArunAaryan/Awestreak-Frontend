import React from "react";
import Navbar from "../Navbar/index.tsx";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex mx-auto bg-gray-900 min-h-screen justify-center ">
        <div className="flex flex-col gap-4 px-4 md:px-10 py-4 bg-gray-900 min-h-screen max-w-lg justify-start items-stretch flex-1">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Root;
