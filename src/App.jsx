import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";

import HeaderPage from "./pages/HeaderPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
// import Products from "./components/Products/Products";
import FilteredPage from "./pages/FilteredPage";
import ProductPage from "./components/ProductPage/ProductPage";
import WishListPage from "./pages/WishListPage";
// import Cart from "./pages/Cart/Cart";
import "./App.css";
import CartPage from "./pages/CartPage";

function App() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.carts);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

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
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:searchQuery" element={<FilteredPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
