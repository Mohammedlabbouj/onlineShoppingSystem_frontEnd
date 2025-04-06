// src/types.ts (or wherever you keep types)
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderReviewPopupProps {
  items: CartItem[];
  shippingCost: number;
  setIsPopupVisible?: () => void;
  idCart?: string;
}

function OrderReviewPopup({
  items,
  shippingCost,
  idCart,
  setIsPopupVisible,
}: OrderReviewPopupProps) {
  const createOrder = async () => {
    const response = await fetch(`http://localhost:9090/api/orders/${idCart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Order created successfully");
    } else {
      console.error("Error creating order");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalPrice = subtotal + shippingCost;

  return (
    // Keeping the overall popup container size flexible,
    // but limiting the height of the item list itself.
    <div
      className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto border border-gray-200 flex flex-col
      absolute z-100
      "
    >
      {" "}
      {/* Use flex-col for structure */}
      {/* --- Title --- */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex-shrink-0">
        {" "}
        {/* Prevent title shrinking */}
        Review shipping and items
      </h2>
      {/* --- Items Section --- */}
      <div className="mb-4 flex-shrink-0">
        {" "}
        {/* Prevent header shrinking */}
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Items ({items.length})
        </h3>
      </div>
      {/* --- Scrollable Item List Container --- */}
      {/* Added max-h-*, overflow-y-auto, and padding-right for scrollbar */}
      <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-4 custom-scrollbar flex-grow min-h-0">
        {" "}
        {/* Allow growing and shrinking, Added min-h-0 for flex behaviour */}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 flex-grow min-w-0">
              {" "}
              {/* Added min-w-0 for flex/truncate */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain rounded border border-gray-100 flex-shrink-0" // Prevent image shrinking
              />
              <div className="flex-grow min-w-0">
                {" "}
                {/* Added min-w-0 for flex/truncate */}
                <p className="text-sm font-medium text-gray-900 truncate">
                  {" "}
                  {/* Truncate long names */}
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900 min-w-[50px] text-right flex-shrink-0">
              {" "}
              {/* Prevent price shrinking */}$
              {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        {/* Show message if no items */}
        {items.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            Your cart is empty.
          </p>
        )}
      </div>
      {/* --- End Scrollable Item List Container --- */}
      {/* --- Separator --- */}
      <hr className="my-4 border-t border-gray-200 flex-shrink-0" />
      {/* --- Shipping Section --- */}
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <p className="text-sm text-gray-600">Shipping handling</p>
        <p className="text-sm font-semibold text-gray-800">
          ${shippingCost.toFixed(2)}
        </p>
      </div>
      {/* --- Separator --- */}
      <hr className="my-4 border-t border-gray-200 flex-shrink-0" />
      {/* --- Total Section --- */}
      <div className="flex justify-between items-center mt-4 mb-6 flex-shrink-0">
        <p className="text-base font-medium text-gray-700">
          Total price order:
        </p>
        <p className="text-lg font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
      {/* --- Action Button --- */}
      <button
        onClick={() => {
          createOrder();
          setIsPopupVisible();
        }}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out text-center flex-shrink-0"
        disabled={items.length === 0} // Disable button if cart is empty
        aria-disabled={items.length === 0}
      >
        Place the order
      </button>
      {/* Optional: Add custom scrollbar styles if needed */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default OrderReviewPopup;
