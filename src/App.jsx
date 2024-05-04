import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/productPage/productPage";
// import Prodcts from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./Pages/Cart/Cart";
import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function App() {
  const {carts} = useSelector((state) => state.carts)

useEffect(() => {
  localStorage.setItem('carts', JSON.stringify(carts))
}, [carts] )



  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      {<Footer />}
    </>
  );
}

export default App;
