import { Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./Pages/MainPage";
import Cart from "./Pages/Cart/Cart";
import "./App.css";

function App() {
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
