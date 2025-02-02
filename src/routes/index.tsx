import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainbody from "../components/main-body";
import ISuspense from "../components/suspense";
import Layout from "../layout";
import ErrorPage from "../components/error-page";

const Comments = lazy(() => import("../modules/comments"));
const CommentDetails = lazy(() => import("../modules/comments/details"));
const Users = lazy(() => import("../modules/users"));
const UserDetails = lazy(() => import("../modules/users/details"));

export default function MainRoutes() {
  const routes = createBrowserRouter([
    {
      element: <Mainbody />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: (
                <ISuspense>
                  <Comments />
                </ISuspense>
              ),
              errorElement: <ErrorPage errorCode={400} />,
            },
            {
              path: "/comments/:id",
              element: <CommentDetails />,
              errorElement: <ErrorPage errorCode={400} />,
            },
            {
              path: "/users",
              children: [
                {
                  index: true,
                  element: (
                    <ISuspense>
                      <Users />
                    </ISuspense>
                  ),
                  errorElement: <ErrorPage errorCode={400} />,
                },
                {
                  path: "/users/:id",
                  element: <UserDetails />,
                  errorElement: <ErrorPage errorCode={400} />,
                },
              ],
            },
            {
              path: "*",
              element: <ErrorPage errorCode={404} />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
