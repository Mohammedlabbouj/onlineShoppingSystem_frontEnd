import React, { useState } from "react";
import OrderReviewPopup from "../components/OrderReviewPopup"; // Adjust import path
import { Product } from "../components/OrderReviewPopup";

const MyCartPage: React.FC = () => {
  // State to control popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Sample data (replace with your actual cart data)
  const cartItems: Product[] = [
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    {
      id: "prod1",
      name: "Nike Air Jordan Super Ball Event", // Corrected spelling slightly based on common names
      imageUrl: "/path/to/your/jordan-image.jpg", // *** REPLACE with actual image path ***
      quantity: 1,
      price: 99.0,
    },
    // Add more items if needed
  ];

  const shippingCost = 10.0;

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePlaceOrder = () => {
    console.log("Placing order...");
    // Add your order placement logic here
    // e.g., send data to backend, navigate user, etc.
    handleClosePopup(); // Close popup after placing order
  };

  return (
    <div>
      {/* Your other page content */}
      <h1>My Shopping Cart</h1>
      {/* ... list items, etc. ... */}

      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Review Order
      </button>

      {/* --- Conditional Rendering of the Popup --- */}
      {isPopupVisible && (
        // Optional: Add a backdrop overlay for a modal effect
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          {/* You might want a close button on the overlay itself */}
          {/* <div className="absolute inset-0" onClick={handleClosePopup}></div> */}

          <OrderReviewPopup
            items={cartItems}
            shippingCost={shippingCost}
            onPlaceOrder={handlePlaceOrder}
            // You could pass handleClosePopup here if the popup had its own close button
          />
        </div>
      )}
    </div>
  );
};

export default MyCartPage;
