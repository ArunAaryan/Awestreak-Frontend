import { useEffect, useState } from "react";
import Navbar from "../Navbar/index.tsx";
import { Outlet, useSearchParams } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";
const queryClient = new QueryClient();

import { userContext as UserContext } from "./UserContext.ts";
import { Toaster as ShadcnToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import axiosClient from "@/axios.ts";
import { API_URL, SOCKET_URL } from "../../config.ts";
import ErrorBoundary from "@/ErrorBoundary.tsx";
import { OverlayLoader } from "../components/ui/Loader.tsx";
import { loaderContext as LoaderContext } from "../LoaderContext.ts";
import io from "socket.io-client";
import { boardQueryKeys } from "../api/boards/boards.keys.ts";
import { toast } from "sonner";
import ScrollToTop from "../components/ScrollToTop";
// import { config } from "process";
const Root = () => {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [socketUrl, setSocketUrl] = useState("wss://localhost:3000");

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to Nestjs websocket server!");
    });

    socket.on(
      "update",
      (message: { type: string; id: string; info?: string }) => {
        if (message?.info) {
          toast(message.info);
        }
        switch (message.type) {
          case "board":
            queryClient.invalidateQueries(boardQueryKeys.detail(message.id));
            return;
          case "boards":
            queryClient.invalidateQueries(boardQueryKeys.all);
            queryClient.invalidateQueries(boardQueryKeys.my);
            return;
          case "default":
            return;
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const getUserData = async (access_token: string) => {
      try {
        const res = await axiosClient.get(`${API_URL}/auth/user`, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
        if (res.status === 401) {
          window.location.href = "/";
        }
        setUserId(res.data.id);
        return res.data.userId;
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          await localStorage.removeItem("currentUser");
          window.location.href = "/";
        }
      }
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
      }

      // Get new token from params after redirect
      const access_token = await searchParams.get("access_token");
      if (access_token) {
        await localStorage.setItem("currentUser", access_token);
        await getUserData(access_token);
      }
    };

    getTokenFromParams();
  }, []);

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary>
        <UserContext.Provider value={userId ?? ""}>
          <LoaderContext.Provider
            value={{
              loading,
              setLoading,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
                  <div className="flex mx-auto min-h-screen justify-center pt-20">
                    <div className="flex flex-col gap-4 px-4 md:px-10 py-4 min-h-screen max-w-2xl justify-start items-stretch flex-1  text-card-foreground rounded-lg shadow-sm ">
                      <Navbar />
                      <ScrollToTop />
                      <Outlet />
                      <ShadcnToaster duration={2000} />
                      {loading && <OverlayLoader />}
                    </div>
                  </div>
                </div>
              </ThemeProvider>
            </QueryClientProvider>
          </LoaderContext.Provider>
        </UserContext.Provider>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
};

export default Root;
