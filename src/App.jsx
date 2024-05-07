import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import Products from "./components/Products/Products";
import ProductPage from "./pages/productPage/productPage";
import WishListPage from "./pages/WishListPage";
import Cart from "./pages/Cart/Cart";
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
