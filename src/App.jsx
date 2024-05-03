import { Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./Pages/MainPage";
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
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
