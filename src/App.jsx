import { Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
// import NavBar from "./components/NavBar/NavBar";
import MainPage from "./pages/MainPage";
import "./App.css";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
