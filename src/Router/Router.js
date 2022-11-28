import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layout/DashBoardLayout";
import Main from "../layout/Main";
import Blog from "../Pages/Blog/Blog/Blog";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyWishList from "../Pages/Dashboard/MyOrders/MyWishList/MyWishList";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers/AllSellers";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import ViewAllProducts from "../Pages/Home/ViewAllProducts/ViewAllProducts";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentWishlist from "../Pages/Dashboard/Payment/PaymentWishlist";
import AdminRoute from "./PrivateRoute/AdminRoute";
import SellerRoute from "./PrivateRoute/SellerRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },

      {
        path: "/categoryDetails/:name",
        element: (
          <PrivateRoute>
            <ViewAllProducts></ViewAllProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-alpha.vercel.app/categoryDetails/${params.name}`
          ),
      },

      {
        path: "/blog",
        element: <Blog></Blog>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <MyWishList></MyWishList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-alpha.vercel.app/bookings/${params.id}`
          ),
      },
      {
        path: "/dashboard/payments/:id",
        element: (
          <PrivateRoute>
            <PaymentWishlist></PaymentWishlist>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-alpha.vercel.app/wishlists/${params.id}`
          ),
      },
    ],
  },
]);
