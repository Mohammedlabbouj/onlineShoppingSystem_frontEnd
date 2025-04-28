import React, {  useEffect, useState } from "react";
import { getOrders } from "@/functions/getVendorOrders";
import { Order  , OrderItem} from "@/types/orders";
import { getCustomer } from "@/functions/getCustomer";
import { customer } from "@/types/customer";
import { getProductFunction} from "@/functions/getProduct";
import { ProductType } from "@/types/product";




// --- Helper Components ---

// Order Item Detail Row (Shown when expanded)
interface OrderItemDetailRowProps {
  item: OrderItem;
  productId: number;
  currencySymbol?: string;
}
const OrderItemDetailRow: React.FC<OrderItemDetailRowProps> = ({
  item,
  currencySymbol = "$",
}) => {
  const [product, setProduct] = useState<ProductType>();
  const defaultImage = "https://placehold.co/100x80/F5F5F5/BDBDBD?text=No+Img";
  useEffect(()=>{
    try {
      const fetchProduct = async () => {
        const response = await getProductFunction(item.productId as number);
        if (response) {
          setProduct(response);
        } else {
          console.error("No product found or error fetching product.");
        }
      };
      fetchProduct();
    }catch (error) {
      console.error("Error fetching product:", error);
    }
    
  },[])

  return (
    <div className="flex items-center space-x-4 py-3 px-4 border-t border-gray-200 bg-white hover:bg-gray-50">
      {/* Image */}
      <img
        src={product?.image || defaultImage}
        alt={product?.name}
        className="w-12 h-12 object-contain rounded border border-gray-100 flex-shrink-0 bg-white"
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
      {/* Details */}
      <div className="flex-grow grid grid-cols-3 gap-4 items-center text-xs text-gray-700">
        <span className="truncate" title={item.name}>
          {item.name}
        </span>
        <span className="text-center">{item.quantity}</span>
        <span className="text-right font-medium">
          {currencySymbol}
          {item.priceAtPurchase.toFixed(2)}
        </span>
      </div>
      {/* Empty div to align with buttons in header if needed */}
      <div className="w-[140px] flex-shrink-0"></div>
    </div>
  );
};

// Pending Order Row (Main component with expand/collapse)
interface PendingOrderRowProps {
  order: Order;
}
const PendingOrderRow: React.FC<PendingOrderRowProps> = ({ order }) => {
  const [customer, setCustomer] = useState<customer>();
  const [isExpanded, setIsExpanded] = useState(false);
  const currencySymbol =  "$";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShipOrder = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggleExpand when clicking button
    alert(`Shipping Order for ${order.customerId}...`);
    // Add actual shipping logic here
  };
  useEffect(()=>{
    const fetchCustomer = async () => {
      try {
        const response = await getCustomer(order.customerId as number);
        console.log("customer", response);
        if (response) {
          setCustomer(response);
        } else {
          console.error("No customer found or error fetching customer.");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
    fetchCustomer();
  },[])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-3">
      {/* Clickable Header Row */}
      <div
        className="flex items-center space-x-4 p-3 cursor-pointer hover:bg-gray-50"
        onClick={toggleExpand}
      >
        {/* Customer/Date/Amount Info */}
        <div className="flex-grow grid grid-cols-3 gap-4 items-center text-sm">
          <span
            className="font-medium text-gray-800 truncate"
            title={customer?.username}
          >
            For {customer?.username}
          </span>
          <span className="text-gray-600 text-center">placingDate</span>
          <span className="text-gray-800 font-semibold text-right">
            {currencySymbol}
            {order.totalAmount.toFixed(2)}
          </span>
        </div>

        {/* Status and Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0 w-[140px] justify-end">
          {/* Status Badge */}
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            {order.status}
          </span>
          {/* Ship Button */}
          <button
            onClick={handleShipOrder}
            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-500"
          >
            Ship
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Optional Header for details */}
          {/* <div className="grid grid-cols-3 gap-4 px-4 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
               <span>Product Name</span>
               <span className="text-center">Quantity</span>
               <span className="text-right">Amount</span>
               <div className="w-[140px]"></div> // Spacer to align
           </div> */}
          {order.items.map((item) => (
            <OrderItemDetailRow
              key={item.id}
              item={item}
              productId={item.productId}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Component Container ---
const App: React.FC = () => {
   const [orders, setOrders] = useState<Order[]>([]);
  let vendorId = localStorage.getItem("id")
  useEffect(() => {
    const fetchOrders = async () => {
    try {
      const respons = await getOrders(vendorId as string);
      if (respons) {
        setOrders(respons);
      } else {
        console.error("No orders found or error fetching orders.");
      }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }}
    fetchOrders();
  }, [vendorId]);


  

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Pending Orders
        </h1>

        {/* List of Orders */}
        <div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <PendingOrderRow key={order.orderDTOId} order={order} />
            ))
          ) : (
            <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm border">
              No pending orders found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
