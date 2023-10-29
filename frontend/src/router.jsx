import {
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Signup from "./components/signup/Signup.jsx";
import NewBlog from "./components/NewBlog/NewBlog.jsx";
import BlogList from "./components/BlogList/BlogList.jsx";
import Blog from "./components/Blog/Blog.jsx";
import NavBar from "./components/NavBar/NavBar";
import Logout from "./components/Logout/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      {
        path: "/",
        element: <BlogList />,
      },
      {
        path: "/blogs/:id",
        element: <Blog />,
      },
      {
        path: "/newblog",
        element: <NewBlog />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "login",
        element: <h1>Login(placeholder)</h1>,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ]
  }]);

export default router;