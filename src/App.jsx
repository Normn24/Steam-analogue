import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";
import { fetchOrders } from "./redux/order.slice/order.slice";
import { fetchUser } from "./redux/user.slice/user.slice";

import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import WishListPage from "./pages/WishListPage";
import SignInForm from "./components/SignInForm/SignInForm";
import CartPage from "./pages/CartPage";
import LibraryPage from "./pages/LibraryPage";
import ProtectedRoute from "./ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import OrderPage from "./pages/OrderPage";
import UserPage from "./pages/UserPage";
import UserProfile from "./components/UserLayout/UserProfile";
import UserOrders from "./components/UserLayout/UserOrders";
import UserWishlist from "./components/UserLayout/UserWishlist";
import UserReviews from "./components/UserLayout/UserReviews";
import ResetPasswordForm from "./components/ForgotPasswordForm/ResetPasswordForm";

import Loader from "./pages/Loader.jsx";

import useToken from "./hooks/useToken";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const token = useToken();

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchUser(token));
      dispatch(fetchWishList(token));
      dispatch(fetchCart(token));
      dispatch(fetchOrders(token));
    }
  }, [dispatch, loggedIn, token]);

  return (
    <>
      <Loader />

      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
        </Route>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/search/*" element={<SearchPage />} />
        <Route
          path="/products/category/:catalogQuery"
          element={<CategoryPage />}
        />
        <Route path="/register" element={<SignInForm />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute element={<UserPage />} isAllowed={loggedIn} />
          }
        >
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="wishlist" element={<UserWishlist />} />
          <Route path="reviews" element={<UserReviews />} />
        </Route>

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute element={<WishListPage />} isAllowed={loggedIn} />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute element={<CartPage />} isAllowed={loggedIn} />
          }
        />
        <Route
          path="/cart/order"
          element={
            <ProtectedRoute element={<OrderPage />} isAllowed={loggedIn} />
          }
        />
        <Route
          path="/products/library"
          element={
            <ProtectedRoute element={<LibraryPage />} isAllowed={loggedIn} />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
