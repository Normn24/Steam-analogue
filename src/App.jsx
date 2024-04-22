import Prodcts from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ProductPage from "./pages/productPage/productPage";

const router = createBrowserRouter([
  {
    //path: "products/:id",
    path: "/",
    element: <Home />,
    //errorElement: <ErrorFallback />,
  },
  {
    //path: "products/:id",
    path: "products",
    element: <ProductPage />,
    //errorElement: <ErrorFallback />,
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <NavBar />
      <Prodcts />
      <Footer />
    </>
  );
}

export default App