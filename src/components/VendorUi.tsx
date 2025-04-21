import { Route, Routes, Navigate } from "react-router-dom";
import VendorDashboard from "@/pages/VendorDashboard";
import Login from "@/pages/Loging";
import Signup from "@/pages/SingUp";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
interface VendorUiProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
export default function VendorUi({
  isAuthenticated,
  setIsAuthenticated,
}: VendorUiProps) {
  const handelLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <VendorDashboard handelLogOut={handelLogOut} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/addProduct"
          element={
            isAuthenticated ? <AddProduct /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/editProduct/:id"
          element={
            isAuthenticated ? <EditProduct /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
