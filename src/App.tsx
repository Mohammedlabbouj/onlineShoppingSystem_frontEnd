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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
  }, []);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isAuthPage);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isAuthPage]);

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
      {!isAuthPage ? <NavBar /> : null}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/AddProduct"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
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
      </Routes>
    </div>
  );
}

export default App;
