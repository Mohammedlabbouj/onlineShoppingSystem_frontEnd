const userId = Number(localStorage.getItem("id"));
import { User } from "@/pages/Loging";

interface CartType {
  id: number;
  customer: User;
  items: [];
}
let UserCart : CartType;

export const getCartId = async () => {
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
    UserCart = data;
    console.log(UserCart);
} catch (error) {
    console.error("Error managing shopping cart:", error);
    throw error;
  } finally {
  }
  return await UserCart.id;
};
