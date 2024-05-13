import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";
import { fetchCart } from "./redux/cart.slice/cart.slice";

import HeaderPage from "./pages/HeaderPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import FilteredPage from "./pages/FilteredPage";
import ProductPage from "./components/ProductPage/ProductPage";
import WishListPage from "./pages/WishListPage";
import "./App.css";
import LogInForm from "./components/LogInForm/LogInForm";
import CartPage from "./pages/CartPage";

import FilterPanel from "./components/Filter/FilterPanel";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishList());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      {/* {!isSignd ? (
        <Modal isOpen={isModalOpen}>
          <ModalWrapper>
            <ModalHeader>
              <h1>Sign In</h1>
            </ModalHeader>

            <ModalBody>
              <SignInForm
                Modalstate={Modalstate}
                setIsSignd={setIsSignd}
                isSignd={isSignd}
              ></SignInForm>
            </ModalBody>
            <ModalFooter
              firstText="Log in now"
              firstClick={() => {
                setIsSignd(!isSignd);
              }}
            />
          </ModalWrapper>
        </Modal>
      ) : (
        <Modal isOpen={isModalOpen}>
          <ModalWrapper>
            <ModalHeader>
              <h1>Log in</h1>
            </ModalHeader>

            <ModalBody>
              <LogInForm Modalstate={Modalstate}></LogInForm>
            </ModalBody>
            <ModalFooter />
          </ModalWrapper>
        </Modal>
      )} */}
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:searchQuery" element={<FilteredPage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
      <Footer />

      <FilterPanel/>
    </>
  );
}

export default App;
