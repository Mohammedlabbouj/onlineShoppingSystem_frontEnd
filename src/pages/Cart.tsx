import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import RemoveButton from "../components/Button";
interface CartProduct {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItemWithDetails extends CartProduct {
  details: ProductDetails;
}

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productId, setProductId] = useState<number>();

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      const userId = localStorage.getItem("id");
      console.log(userId)
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's cart
        const cartResponse = await fetch(
          `https://fakestoreapi.com/carts/${userId}`
        );
        if (!cartResponse.ok) throw new Error("Failed to fetch cart");
        const cartData: Cart = await cartResponse.json();
        setCart(cartData);

        // Fetch product details for each item in cart
        const itemsWithDetails = await Promise.all(
          cartData.products.map(async (item) => {
            const productResponse = await fetch(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            if (!productResponse.ok)
              throw new Error(`Failed to fetch product ${item.productId}`);
            const productData = await productResponse.json();

            return {
              ...item,
              details: productData,
            };
          })
        );

        setCartItemsWithDetails(itemsWithDetails);
      } catch (err) {
        console.error("Cart error:", err);
        setError(err instanceof Error ? err.message : "Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartAndProducts();
  }, []);

  const calculateTotal = () => {
    return cartItemsWithDetails.reduce(
      (total, item) => total + item.details.price * item.quantity,
      0
    );
  };

  if (isLoading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!cart || cartItemsWithDetails.length === 0) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  const handelRemoveProductFromCart = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      return;
    }
    const response = await fetch(`https://fakestoreapi.com/carts/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    if (response.ok) {
      alert("Product removed from cart");
    } else {
      throw new Error("Failed to remove product from cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid gap-4">
        {cartItemsWithDetails.map((item) => (
          <div
            key={item.productId}
            className="flex items-center border rounded-lg p-4 shadow-md"
          >
            <img
              src={item.details.image}
              alt={item.details.title}
              className="w-24 h-24 object-contain"
            />
            <div className="ml-6 flex-grow">
              <h3 className="font-semibold">{item.details.title}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="font-bold">
                ${(item.details.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <RemoveButton
              value="Remove"
              onClick={() => {
                setProductId(item.productId);
                handelRemoveProductFromCart();
              }}
            />
          </div>
        ))}

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          <button className="w-full mt-4 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
