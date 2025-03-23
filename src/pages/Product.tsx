import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import AddButton from "../components/Button";
import RemoveButton from "../components/Button";
export interface ProductType {
  productId: number;
  name: string;
  description: string;
  price: number;
  image: string;

}
export interface CartProduct {
  productId: number; // Changed from productsId to match API response
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addedToCart, setAddedToCart] = useState(false);

  const handelIsProductInCart = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data: Cart = await response.json();

      // Check if any product in the cart matches our current product id
      const isInCart = data.products.some((p) => {
        return p.productId === Number(product?.productId);
      });

      setAddedToCart(isInCart);
    } catch (err) {
      console.error("Check if product in cart error:", err);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          products: [
            {
              productId: product.productId,
              quantity: 1,
            },
          ],
        }),
      });

      if (response.ok) {
        setAddedToCart(true);
        alert("Product added to cart");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add product to cart");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:9090/api/products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const handelRemoveProductFromCart = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.productId,
        }),
      });

      if (response.ok) {
        setAddedToCart(false);
        alert("Product removed from cart");
      } else {
        throw new Error("Failed to remove product from cart");
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
      alert("Failed to remove product from cart");
    }
  };

  // handelIsProductInCart();
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold">${product.price}</p>
          <div>
            {addedToCart ? (
              <RemoveButton
                className="bg-red-700"
                value="Remove from cart"
                onClick={handelRemoveProductFromCart}
              />
            ) : (
              <AddButton 
              className="bg-green-700"
              value="Add to cart" onClick={handleAddToCart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
