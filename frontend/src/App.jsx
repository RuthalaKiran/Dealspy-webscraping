import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Productdtls from "./pages/Productdtls";
import About from "./pages/About";

function App() {
  return (
    <>
      <div className="app max-w-10xl mx-auto">
        <Navbar /> 
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/product/:productId" element={<Productdtls />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
