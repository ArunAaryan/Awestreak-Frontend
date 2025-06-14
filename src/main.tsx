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
      <Suspense
        fallback={
          <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        }
      >
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
        element: <BoardList type="all" />,
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
        element: <BoardList type="all" />,
        // loader: boardListLoaderAll(queryClient),
      },
      {
        path: "my",
        element: <BoardList type="my" />,
        // loader: boardListLoaderMy(queryClient),
      },
      {
        path: "private",
        element: <BoardList type="private" />,
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
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// Register service worker
registerServiceWorker();
