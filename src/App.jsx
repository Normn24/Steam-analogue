import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HeaderPage from "./pages/HeaderPage";
import ProductPage from "./pages/productPage/productPage";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import "./App.css";
import WishListPage from "./pages/WishListPage";

function App() {
  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/category=:catalogItem" element={<Products />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
