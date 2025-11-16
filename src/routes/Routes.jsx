import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error404";
import Login from "../pages/auth/Login";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../pages/auth/Profile";
import Categories from "../pages/Categories";
import AddCategory from "../pages/AddCategory";
import Codes from "../pages/Codes";
import AddCode from "../pages/AddCode";
import ViewCode from "../pages/ViewCode";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/categories",
        element: (
          <PrivateRoutes>
            <Categories />
          </PrivateRoutes>
        ),
      },
      {
        path: "/codes/:id",
        element: (
          <PrivateRoutes>
            <Codes />
          </PrivateRoutes>
        ),
      },
      {
        path: "/view-code/:id",
        element: (
          <PrivateRoutes>
            <ViewCode />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-category",
        element: (
          <PrivateRoutes>
            <AddCategory />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-code/:categoryId",
        element: (
          <PrivateRoutes>
            <AddCode />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
