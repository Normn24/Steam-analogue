import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {<Footer />}
    </>
  );
}

export default App;
