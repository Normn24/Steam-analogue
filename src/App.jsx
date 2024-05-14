import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";

import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import WishListPage from "./pages/WishListPage";
import LogInForm from "./components/LogInForm/LogInForm";
import SignInForm from "./components/SignInForm/SignInForm";
import CartPage from "./pages/CartPage";
import "./App.css";
import LibraryPage from "./pages/LibraryPage";

function App() {
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    if (loggedIn === "true") {
      dispatch(fetchWishList());
      dispatch(fetchCart());
    }
  }, [dispatch, loggedIn]);

  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/search/:searchQuery" element={<SearchPage />} />
        <Route path="/products/genre/:genreId" element={<SearchPage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/register" element={<SignInForm />} />

        {loggedIn === "true" ? (
          <>
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/library" element={<LibraryPage />} />
          </>
        ) : (
          <>
            <Route path="/wishlist" element={<Navigate to="/login" />} />
            <Route path="/cart" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
