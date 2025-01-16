import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/products.slice/products.slice.js";
import { initializeSession } from "./redux/auth.slice/login.slice.js";

import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import AppRoute from "./utils/AppRoute";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(initializeSession());
  }, [dispatch]);

  return (
    <>
      <HeaderPage />
      <AppRoute />
      <Footer />
    </>
  );
}

export default App;
