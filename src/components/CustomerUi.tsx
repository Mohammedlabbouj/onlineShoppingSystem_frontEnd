import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Cart from "@/pages/Cart";
import Login from "@/pages/Loging";
import Signup from "@/pages/SingUp";
import NavBar from "@/components/NavBar";
import AddProduct from "@/pages/AddProduct";
import CheckoutPage from "@/pages/CheckoutPage";
import Account from "@/pages/Account.tsx";
import Products from "@/pages/Products";
import CategorySearch from "@/pages/CategorySearch";
import Test from "@/components/Test.tsx";

interface CustomerUiProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function CustomerUi({ isAuthenticated, setIsAuthenticated }: CustomerUiProps) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className={isAuthPage ? "" : "pt-16"}>
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

export default CustomerUi;
