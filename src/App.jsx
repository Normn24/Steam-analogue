import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";
import React, { useState } from "react";

import HeaderPage from "./pages/HeaderPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
// import Products from "./components/Products/Products";
import FilteredPage from "./pages/FilteredPage";
import ProductPage from "./components/ProductPage/ProductPage";
import WishListPage from "./pages/WishListPage";
// import Cart from "./pages/Cart/Cart";
import "./App.css";
import CartPage from "./pages/CartPage";

//import Modal
import Modal from "../src/components/Modal/Modal";
import ModalWrapper from "../src/components/Modal/ModalWrapper";
import ModalHeader from "../src/components/Modal/ModalHeader";
import ModalFooter from "../src/components/Modal/ModalFooter";
import ModalBody from "../src/components/Modal/ModalBody";
import SignInForm from "./components/SignInForm/SignInForm";
import LogInForm from "./components/LogInForm/LogInForm";

function App() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.carts);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    dispatch(fetchWishList());
    dispatch(fetchCart());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSignd, setIsSignd] = useState(true);

  const handleSignIn = () => {
    localStorage.setItem("userData", JSON.stringify({ username: "exampleUser" }));
    setIsSignd(true);
    setIsModalOpen(false);
  };

  const handleLogIn = () => {
    setIsSignd(false);
  };

  return (
    <>
      {!isSignd ? (
        <Modal isModal={isModalOpen}>
          <ModalWrapper>
            <ModalHeader>
              <h1>Sign In</h1>
            </ModalHeader>

            <ModalBody>
              <SignInForm Modalstate={isModalOpen} setIsSignd={setIsSignd} />
            </ModalBody>
            <ModalFooter
              firstText="Log in now"
              firstClick={() => {
                handleLogIn();
              }}
            /> 
          </ModalWrapper>
        </Modal>
      ) : (
        <Modal isModal={isModalOpen}>
          <ModalWrapper>
            <ModalHeader>
              <h1>Log in</h1>
            </ModalHeader>

            <ModalBody>
              <LogInForm Modalstate={isModalOpen} setIsModalOpen ={setIsModalOpen} />
            </ModalBody>
            <ModalFooter ><button onClick={()=>{ handleLogIn()}}>Sign in now</button></ModalFooter >
          </ModalWrapper>
        </Modal>
      )}

      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:searchQuery" element={<FilteredPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
