import React, { useEffect, useState } from "react";
import { getOrders } from "@/functions/getOrders";
import { Order, OrderItem } from "@/types/orders";

// --- Helper Components ---

// Order Item Card
interface OrderItemCardProps {
  item: OrderItem;
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  const defaultImage =
    "https://placehold.co/100x80/F5F5F5/BDBDBD?text=No+Image";

  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <img
        src={item.imageUrl || defaultImage}
        alt={item.name}
        className="w-16 h-16 object-contain rounded border border-gray-100 flex-shrink-0 bg-white" // Use object-contain
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
      {/* Details */}
      <div className="flex-grow">
        <p className="font-semibold text-sm text-gray-800">{item.name}</p>
        <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-xs text-gray-600">
          Price: ${item.priceAtPurchase.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

// Order Status Badge
interface OrderStatusBadgeProps {
  status: Order["status"];
}
const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";

  switch (status) {
    case "PENDING":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "Shipped":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    case "Delivered":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "Cancelled":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

// Order Card
interface OrderCardProps {
  order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [detailsVisible, setDetailsVisible] = useState(true); // Initially show details as per image

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleMessageClick = () => {
    alert(`Messaging about Order ${order.orderDTOId}...`); // Placeholder action
    // Implement actual navigation or chat opening logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-0">
          Order: {order.orderDTOId}
        </h3>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-semibold text-gray-800">
            ${order.totalAmount.toFixed(2)}
          </p>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Card Body - Conditionally Rendered Items */}
      {detailsVisible && (
        <div className="p-4">
          {order.items.map((item) => (
            <OrderItemCard item={item} />
          ))}
        </div>
      )}

      {/* Card Footer - Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={toggleDetails}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
        >
          {detailsVisible ? "Close Details" : "Show Details"}
        </button>
        <button
          onClick={handleMessageClick}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 flex items-center space-x-1"
        >
          <span>Message</span>
          {/* Chat Icon (inline SVG or from library) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.892 8.892 0 01-2.647-.488c-.083-.025-.169-.043-.257-.057a.879.879 0 00-.5-.017c-.307.046-.61.1-.913.161A.9.9 0 014 16.019V13.5a6.96 6.96 0 01-2-4.5C2 5.134 5.582 2 10 2s8 3.134 8 8zm-4.172-3.172a.75.75 0 00-1.06 1.06L13.06 9H7.75a.75.75 0 000 1.5h5.31l-.292.292a.75.75 0 101.06 1.06l1.5-1.5a.75.75 0 000-1.06l-1.5-1.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component (Example Usage) ---
export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  // In a real app, you'd fetch a list of orders

  let customerId = localStorage.getItem("id");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(customerId as string);
        if (response) {
          setOrders(response);
        } else {
          console.error("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [customerId]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* This container simulates the main content area, ignoring the nav bar */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Your orders
        </h1>

        {/* List of Orders */}
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.orderDTOId} order={order} />
            ))
          ) : (
            <p className="text-center text-gray-500">You have no orders yet.</p>
          )}
          {/* Add more OrderCard components here if needed */}
        </div>
      </div>
    </div>
  );
}
