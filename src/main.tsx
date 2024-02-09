import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BoardDetail from "./Boards/BoardDetail.tsx";
import { QueryClient } from "react-query";
import NewBoard from "./Boards/NewBoard.tsx";
import BoardList from "./Boards/BoardList.tsx";

import {
  boardListLoaderAll,
  boardListLoaderMy,
} from "./api/boards/boards-api.ts";
import HomeTemp from "./HomeTemp.tsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  // {
  //   index: true,
  //   element:,
  // },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomeTemp />,
        path: "/",
        loader: boardListLoaderAll(queryClient),
      },
    ],
  },
  {
    element: <Root />,
    path: "/boards",
    children: [
      {
        path: "all",
        element: <BoardList />,
        loader: boardListLoaderAll(queryClient),
      },
      {
        element: <BoardDetail />,
        path: ":id",
        loader: boardListLoaderMy(queryClient),
      },
      {
        path: "create",
        element: <NewBoard />,
      },
    ],
  },
  //   { path: "/home",
  //     element: <Home />,
  //   },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
