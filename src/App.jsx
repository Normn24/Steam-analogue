import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderPage from "./Pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./Pages/MainPage";
import Products from "./components/Products/Products";
import ProductPage from "./Pages/ProductPage/ProductPage";
import WishListPage from "./Pages/WishListPage";
import Cart from "./Pages/Cart/Cart";
import "./App.css";

function App() {
  const { carts } = useSelector((state) => state.carts);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/category=:catalogItem" element={<Products />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
