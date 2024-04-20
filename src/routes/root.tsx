import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index.tsx";
import { Outlet, useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import { userContext as UserContext } from "./UserContext.ts";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import axiosClient from "@/axios.ts";
import { API_URL } from "../../config.ts";
const Root = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const getUserData = async (access_token: string) => {
      const res = await axiosClient.get(`${API_URL}/auth/user`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });
      if (res.status == 401) {
        window.location.href = "/";
      }
      setUserId(res.data.id);
      return res.data.userId;
    };
    const getTokenFromParams = async () => {
      const token = await localStorage.getItem("currentUser");

      if (token) {
        try {
          const res = await axiosClient.get(`${API_URL}/auth/user`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          if (res.status === 401) {
            // 401 Unauthorized - remove token and reauthorize
            await localStorage.removeItem("currentUser");
            window.location.href = `${API_URL}/auth/google`;
          } else {
            // Successful response - get user details
            await getUserData(token);
          }
        } catch (error: any) {
          console.log(error);
          if (error.response.status === 401) {
            await localStorage.removeItem("currentUser");
            window.location.href = "/";
          }
        }
      } else {
        // No token - redirect to authorize
        window.location.href = `${API_URL}/auth/google`;

        // Get new token from params after redirect
        const access_token = await searchParams.get("access_token");
        if (access_token) {
          await localStorage.setItem("currentUser", access_token);
          await getUserData(access_token);
        }
      }
    };

    getTokenFromParams();
  }, []);

  return (
    <UserContext.Provider value={userId ?? ""}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="flex mx-auto bg-gray-950 min-h-screen justify-center ">
            <div className="flex flex-col gap-4 px-4 md:px-10 py-4 bg-gray-950 min-h-screen max-w-2xl justify-start items-stretch flex-1">
              <Navbar />
              <Outlet />
              <Toaster />
            </div>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default Root;
