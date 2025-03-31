import { useState } from "react";

const userId = Number(localStorage.getItem("id"));

interface CartType {
  id: number;
}
export const getCartId = async () => {
  // const [UserCart, setUserCart] = useState<CartType | null>(null);
  let UserCart : CartType; 
  try {
    const response = await fetch(
      `http://localhost:9090/api/shopping-cart/customer/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("somthing went worng!");
    }
    const data = await response.json();
    UserCart  = await data;
    console.log(UserCart);
  } catch (error) {
    console.error("Error managing shopping cart:", error);
    throw error;
  } finally {
  }
  return UserCart != null ? await UserCart.id : "faild to get cart by  id ";
};
