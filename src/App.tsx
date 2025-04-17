import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomerUi from "./components/CustomerUi.tsx";
import VendorUi from "./components/VendorUi.tsx";
function App() {
  return (
    <BrowserRouter>
      <AppContent key={localStorage.getItem("userType")} />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true",
  );
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
  }, []);

  return (
    <div>
      {userType === "vendor" ? (
        <VendorUi
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <CustomerUi
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  );
}

export default App;
