import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login"
import ForgotPassword from '../Pages/ForgotPassword'
import SignUp from '../Pages/SignUp'
import AdminPanel from '../Pages/AdminPanel'
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "Sign-Up",
        element: <SignUp/>
      },
      {
        path : "admin-panel",
        element : <AdminPanel/>,
        children : [
          {
              path : "all-users",
              element : <AllUsers/>
          },
          {
            path : "all-products",
            element : <AllProducts/>
        }
      
      ]
    },
    ],
  },
]);
export default router;
