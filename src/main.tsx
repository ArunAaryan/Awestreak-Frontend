import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AllBoards from "./AllBoards.tsx";
import BoardDetail, { boardDetailLoader } from "./Boards/BoardDetail.tsx";
import { QueryClient } from "react-query";
import NewBoard from "./Boards/NewBoard.tsx";
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
        element: <AllBoards />,
        path: "/",
      },
    ],
  },
  {
    element: <Root />,
    path: "/board",
    children: [
      {
        path: "all",
        element: <AllBoards />,
      },
      {
        element: <BoardDetail />,
        path: ":id",
        loader: boardDetailLoader(queryClient),
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
