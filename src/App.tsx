import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
// import Search from "./pages/Search";

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
