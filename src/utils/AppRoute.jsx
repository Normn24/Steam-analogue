import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import ProductPage from "../pages/ProductPage";
import WishListPage from "../pages/WishListPage";
import SignInForm from "../components/SignInForm/SignInForm";
import CartPage from "../pages/CartPage";
import LibraryPage from "../pages/LibraryPage";
import CategoryPage from "../pages/CategoryPage";
import OrderPage from "../pages/OrderPage";
import UserPage from "../pages/UserPage";
import UserProfile from "../components/UserLayout/UserProfile";
import UserOrders from "../components/UserLayout/UserOrders";
import UserWishlist from "../components/UserLayout/UserWishlist";
import UserReviews from "../components/UserLayout/UserReviews";
import ResetPasswordForm from "../components/ForgotPasswordForm/ResetPasswordForm";
import Loader from "../pages/Loader";
import PrivateRoute from "./PrivateRoute";

import "../App.css";

function AppRoute() {
  return (
    <>
      <Loader />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/search/*" element={<SearchPage />} />
        <Route
          path="/products/category/:catalogQuery"
          element={<CategoryPage />}
        />
        <Route path="/register" element={<SignInForm />} />

        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<UserPage />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishlist" element={<UserWishlist />} />
            <Route path="reviews" element={<UserReviews />} />
          </Route>
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/order" element={<OrderPage />} />
          <Route path="/products/library" element={<LibraryPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppRoute;
