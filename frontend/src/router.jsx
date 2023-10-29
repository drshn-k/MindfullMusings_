import {
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Signup from "./components/signup/Signup.jsx";
import NewBlog from "./components/NewBlog/NewBlog.jsx";
import BlogList from "./components/BlogList/BlogList.jsx";
import Blog from "./components/Blog/Blog.jsx";
import NavBar from "./components/NavBar/NavBar";

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
    ]
  }]);

export default router;