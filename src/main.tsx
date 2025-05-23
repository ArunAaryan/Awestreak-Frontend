import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardDetail from "./Boards/BoardDetail.tsx";
// import { QueryClient } from "react-query";
import NewBoard from "./Boards/NewBoard.tsx";
import BoardList from "./Boards/BoardList.tsx";
import EditBoard from "./Boards/EditBoard.tsx";
import Profile from "./Profile/index.tsx";
import { registerServiceWorker } from "./utils/serviceWorker";
// const queryClient = new QueryClient();
const router = createBrowserRouter([
  // {
  //   index: true,
  //   element:,
  // },
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Suspense</p>}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: "me",
        element: <Profile />,
      },
      {
        index: true,
        element: <BoardList />,
        path: "/",
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
        // loader: boardListLoaderAll(queryClient),
      },
      {
        path: "my",
        element: <BoardList />,
        // loader: boardListLoaderMy(queryClient),
      },
      {
        element: <BoardDetail />,
        path: ":id",
      },
      {
        path: "create",
        element: <NewBoard />,
      },
      {
        path: ":id/edit",
        element: <EditBoard />,
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
  </React.StrictMode>
);

// Register service worker
registerServiceWorker();
