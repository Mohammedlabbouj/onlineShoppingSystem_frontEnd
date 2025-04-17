import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { StoreInfo, Vendor } from "../types/vendor"; // Adjust path
import Dashboard from "@/components/Dashboard";
import Products from "@/components/ProductsVendor";
import { getVendor } from "@/functions/getVendor"; // Adjust path

interface Props {
  handelLogOut: () => void;
}
interface VendorInfo {
  vendorId: number;
  username: string;
  email: string;
  password: string;
  products: [];
  orders: [];
  payments: [];
}

// Define the possible page types
type ActivePageType = "Dashboard" | "Products" | "Reviews";

function VendorDashboard({ handelLogOut }: Props) {
  // --- State for the active page ---
  const [activePage, setActivePage] = useState<ActivePageType>("Dashboard");
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>();

  useEffect(() => {
    // Fetch vendor data from the API
    const fetchVendorInfo = async () => {
      try {
        const vendorId = localStorage.getItem("id");
        if (vendorId) {
          const response = await getVendor(vendorId);
          setVendorInfo(response);
        } else {
          console.error("No vendor ID found in local storage");
        }
      } catch (error) {
        console.error("Error fetching vendor info:", error);
      }
    };

    fetchVendorInfo();
  }, []);
  // --- Mock Data (Replace with API calls) ---
  const storeInfo: StoreInfo = {
    name: "Store Name",
    pictureUrl: undefined, // Add a URL for a real picture
  };

  const vendor: Vendor = {
    name: "mr vendor",
  };

  // --- Mock Reviews (Placeholder - replace with real data/API) ---
  const reviews = [
    { id: 1, user: "Customer A", rating: 5, comment: "Great product!" },
    {
      id: 2,
      user: "Customer B",
      rating: 4,
      comment: "Works well, fast shipping.",
    },
    {
      id: 3,
      user: "Customer C",
      rating: 3,
      comment: "Okay, but packaging was damaged.",
    },
  ];
  // --- Handler for Sidebar Navigation ---
  const handleNavigate = (page: ActivePageType) => {
    setActivePage(page);
  };

  // --- Function to render content based on activePage ---
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Products":
        return <Products />;

      case "Reviews":
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Customer Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-3 last:border-b-0"
                  >
                    <p className="font-semibold">
                      {review.user} -{" "}
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
                No reviews received yet.
              </div>
            )}
          </section>
        );
      default:
        return null; // Should not happen
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Pass activePage and the navigation handler to Sidebar */}
      <Sidebar
        handelLogOut={handelLogOut}
        activePage={activePage}
        onNavigate={handleNavigate} // Pass the handler
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-6 md:p-8">
        {/* Header Section (remains the same) */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {storeInfo.pictureUrl ? (
              <img
                src={storeInfo.pictureUrl}
                alt="Store"
                className="w-14 h-14 rounded-full border-2 border-green-500 object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-green-200 border-2 border-green-500 flex items-center justify-center text-green-600 text-xs font-semibold">
                Store picture
              </div>
            )}
            <h1 className="text-xl font-semibold text-gray-700">
              {vendorInfo?.username || "Vendor Name"}
            </h1>
          </div>
          <span className="text-lg text-gray-800">Welcome {vendor.name}</span>
        </header>

        {/* Render Content Based on Active Page */}
        {renderContent()}
      </main>
    </div>
  );
}

export default VendorDashboard;
