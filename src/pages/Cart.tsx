import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { ProductType } from "./Product";
interface CartItemType {
  id: number;
  userId: number;
  products: [ProductType];
}
export default function Cart() {
  const [cartFull, setCartFull] = useState<CartItemType[]>([]);
  const [cart, setCart] = useState<CartItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setCartFull(data);
      } catch (err) {
        console.error("Cart error:", err);
        setError("Failed to load cart");
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      setIsLoading(false);
      return;
    }

    fetch(`https://fakestoreapi.com/carts/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCart(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Cart error:", err);
        setError("Failed to load cart");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!cart) return <div>Cart not found</div>;
  console.log("cart", cartFull);
  return (
    // display the full cart
    <div>
      <h1>Cart</h1>
      <div>
        {cartFull.map((cart) => (
          <div key={cart.id}>
            <h2>Cart ID: {cart.id}</h2>
            {cart.products.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    // <div>
    //   <h1>Cart</h1>
    //   <div>
    //     {cart.products.map((product) => (
    //       <div key={product.id}>
    //         <img src={product.image} alt={product.title} />
    //         <p>{product.title}</p>
    //         <p>{product.price}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
