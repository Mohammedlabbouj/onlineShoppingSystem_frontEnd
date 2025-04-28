import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { StoreInfo } from "../types/vendor";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/ProductsVendor";
import Reviews from "@/components/ProductReviewSummaryCard";
import ReviewsModal from "@/components/ReviewsModal";
import OrdersVendor from "@/pages/OrdersVendor";
import { getVendor } from "@/functions/getVendor";
import { Review, ProductType } from "@/types/product";
import { getProductsByVendorId } from "@/functions/getProductsByid";

interface Props {
  handelLogOut: () => void;
}
interface VendorInfo {
  vendorId: number;
  username: string;
  email: string;
  password: string;
  products: ProductType[];
  orders: [];
  payments: [];
}

// Define the possible page types
type ActivePageType =
  | "Dashboard"
  | "Products"
  | "Reviews"
  | "HotTrends"
  | "Orders";

function VendorDashboard({ handelLogOut }: Props) {
  // --- State for the active page ---
  const [activePage, setActivePage] = useState<ActivePageType>("Dashboard");
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>();
  const [productsReviews, setProductsReviews] = useState<ProductType[]>([]);
  // --- State for Modal ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  let vendorId = localStorage.getItem("id");
  useEffect(() => {
    // Fetch products from the API
    const fetchVendorProducts = async () => {
      try {
        const response = await getProductsByVendorId(vendorId as string);
        if (response) {
          setProductsReviews(response);
        } else {
          console.error("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchVendorProducts();
  }, [vendorId]);

  useEffect(() => {
    // Fetch vendor data from the API
    const fetchVendorInfo = async () => {
      try {
        const vendorId = localStorage.getItem("id");
        if (vendorId) {
          const response = await getVendor(vendorId);
          setVendorInfo(response);
          console.log("Vendor Info:", response);
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

  const handleNavigate = (page: ActivePageType) => {
    setActivePage(page);
  };
  // --- Modal Handlers ---
  const handleOpenReviewsModal = (reviews: Review[], productName: string) => {
    setSelectedReviews(reviews);
    setSelectedProductName(productName);
    setIsModalOpen(true);
  };

  const handleCloseReviewsModal = () => {
    setIsModalOpen(false);
    setSelectedReviews([]); // Clear selected reviews
    setSelectedProductName("");
  };

  // --- Function to render content based on activePage ---
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Products":
        return <Products />;

      case "Orders":
        return <OrdersVendor />;

      case "Reviews":
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Product Reviews & Ratings
            </h2>
            {productsReviews.length > 0 ? (
              <div className="space-y-6">
                {productsReviews.map((product) => (
                  <Reviews
                    key={product.productId}
                    product={product}
                    onSeeReviewsClick={handleOpenReviewsModal} // Pass the handler
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
                No products found or no products have reviews yet.
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
          <span className="text-lg text-gray-800">
            Welcome {vendorInfo?.username}
          </span>
        </header>

        {/* Render Content Based on Active Page */}
        {renderContent()}
      </main>
      {/* Render the Modal (conditionally) */}
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={handleCloseReviewsModal}
        reviews={selectedReviews}
        productName={selectedProductName}
      />
    </div>
  );
}

export default VendorDashboard;
