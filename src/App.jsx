import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
import MainPage from "./pages/MainPage";
// import Prodcts from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
// import NavBar from "./components/NavBar/NavBar";
import Cart from "./pages/Cart/Cart";
import HeaderPage from "./pages/HeaderPage";
import Products from "./components/Products/Products";
import "./App.css";
import WishListPage from "./pages/WishListPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage/ProductPage";

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
