import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";

import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./components/ProductPage/ProductPage";
import WishListPage from "./pages/WishListPage";
import "./App.css";
import LogInForm from "./components/LogInForm/LogInForm";
import CartPage from "./pages/CartPage";

// import FilterPanel from "./components/Filter/FilterPanel";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishList());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/search/:searchQuery" element={<SearchPage />} />
        <Route path="/products/genre/:genreId" element={<SearchPage />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
      <Footer />

      {/* <FilterPanel /> */}
    </>
  );
}

export default App;
