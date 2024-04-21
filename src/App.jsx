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

const App = () => <RouterProvider router={router} />;

export default App