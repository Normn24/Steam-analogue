import Prodcts from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./Pages/Cart/Cart";
import "./App.css";

function App() {
  return (
    <>
      <NavBar /> 
      <Prodcts />
      <Cart/>
      <Footer />
    </>
  );
}

export default App;
