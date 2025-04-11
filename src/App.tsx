import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Loging";
import Signup from "./pages/SingUp";
import NavBar from "./components/NavBar";
import AddProduct from "./pages/AddProduct";
import CheckoutPage from "./pages/CheckoutPage";
import Account from "./pages/Account.tsx";
import VendorDashboard from "./pages/VendorDashboard.tsx";
import Test from "./components/Product.tsx";
import CategorySearch from "./pages/CategorySearch";
import Products from "./pages/Products.tsx";
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviews: string[];
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true",
  );
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
  }, []);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };
  return (
    <div
      className={
        location.pathname == "/login" || location.pathname == "/signup"
          ? ""
          : "pt-16"
      }
    >
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/category/:CATEGORY_SEARCH"
          element={
            isAuthenticated ? <CategorySearch /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/checkout/:idCart"
          element={
            isAuthenticated ? <CheckoutPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/AddProduct"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/vendorDashboard"
          element={
            isAuthenticated ? <VendorDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={isAuthenticated ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
