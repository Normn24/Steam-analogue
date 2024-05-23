import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

import "./App.css";
import { fetchProducts } from "./redux/products.slice/products.slice";

function App() {
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    if (loggedIn === "true") {
      dispatch(fetchWishList());
      dispatch(fetchCart());
      dispatch(fetchOrders());
      dispatch(fetchUser());
      dispatch(fetchProducts());
    }
  }, [dispatch, loggedIn]);

  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
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
            <ProtectedRoute
              element={<UserPage />}
              isAllowed={loggedIn === "true"}
            />
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
            <ProtectedRoute
              element={<WishListPage />}
              isAllowed={loggedIn === "true"}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              element={<CartPage />}
              isAllowed={loggedIn === "true"}
            />
          }
        />
        <Route
          path="/cart/order"
          element={
            <ProtectedRoute
              element={<OrderPage />}
              isAllowed={loggedIn === "true"}
            />
          }
        />
        <Route
          path="/products/library"
          element={
            <ProtectedRoute
              element={<LibraryPage />}
              isAllowed={loggedIn === "true"}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
