import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllBoards from "./AllBoards.tsx";
import BoardDetail, { boardDetailLoader } from "./Boards/BoardDetail.tsx";
import { QueryClient } from "react-query";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "allboards",
        element: <AllBoards />,
      },
      {
        path: "board/:id",
        element: <BoardDetail />,
        loader: boardDetailLoader(queryClient),
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
