import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { MessageCircle as MessageIcon } from "lucide-react";
interface PurchaseOptionsProp {
  product: {
    productId: number;
    stockQuantity: number;
    price: number;
  };
}

interface CartType {
  shoppingCartDTOId: number;
  customerId: number;
  cartItems: {
    productId: number;
    cartItemId: number;
    quantity: number;
    shoppingCartId: number;
  }[];
}

export function PurchaseOptions({ product }: PurchaseOptionsProp) {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartType>();
  const [isLoading, setIsLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const array = Array.from({ length: product.stockQuantity }, (_, i) => i + 1);
  let inStock = product.stockQuantity != 0 ? true : false;

  useEffect(() => {
    const getCart = async () => {
      const userId = Number(localStorage.getItem("id"));
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:9090/api/shopping-cart/customer/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const cartData: CartType = await response.json();
        setCart(cartData);
        // Update inCart state based on the fetched cart data
        setInCart(
          cartData.cartItems.some(
            (item) => item.productId === product.productId,
          ),
        );
      } catch (error) {
        console.error("Error fetching cart ID:", error);
      }
    };
    getCart();
  }, [product.productId]);

  const handleAddToCart = async () => {
    console.log("id of cart from handel add " + cart?.shoppingCartDTOId);
    try {
      const response = await fetch(
        "http://localhost:9090/api/shoppingcartitems/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            shoppingCartId: cart?.shoppingCartDTOId,
            productId: product.productId,
            quantity: quantity,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      setInCart(!inCart); // Update inCart state after successful addition
      setQuantity(1);

      // Show success message or notification here
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const handleRemoveFromCart = async () => {
    let itemToDelete: number | undefined;

    // Find the cart item ID first
    cart?.cartItems.forEach((item) => {
      console.log(item.cartItemId);
      if (item.productId === product.productId) {
        itemToDelete = item.cartItemId;
        console.log(itemToDelete);
      }
    });

    if (!itemToDelete) {
      console.error("Cart item not found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/shoppingcartitems/${itemToDelete}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update local state after successful deletion
      setInCart(false);
      alert("Item removed from cart successfully!");

      // Optionally refresh the cart data
      // Add a function to refresh cart data here
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <Card className="p-6">
      <div className="text-xl font-bold mb-4">{product.price}$</div>

      <div className="mb-2 text-green-600 font-medium">
        {inStock ? "In Stock" : "Out of Stock"}
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <span className="mr-2">Quantity:</span>
          <div className="relative">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="pl-3 pr-8 py-2 border rounded-md appearance-none bg-background w-24"
            >
              {[...array].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {!inCart ? (
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            Add to cart
          </Button>
        ) : (
          <Button
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={handleRemoveFromCart}
          >
            Remove from cart
          </Button>
        )}

        <Button className="w-full bg-amber-500 hover:bg-amber-600">
          Buy now
        </Button>

        {/* 🧑‍💼 Seller Info Section */}
        <div className="flex items-center gap-4 pt-4 border-t mt-4">
          {/* Avatar Circle */}
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Seller"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Connect Button */}
          <div className="flex-1">
            <span className="block text-sm font-semibold text-gray-800">
              Alex Johnson
            </span>
            <Button
              variant="outline"
              className="mt-1 text-sm px-3 py-1.5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              Connect
              <MessageIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
