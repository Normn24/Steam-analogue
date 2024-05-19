import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/productPage/productPage";
// import Prodcts from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import OrderPage from "./pages/orderPage/orderPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      {<Footer />}
    </>
  );
}

export default App;
