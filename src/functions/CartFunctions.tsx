
interface CartType {
  shoppingCartDTOId : number;
}
export const getCartId = async () => {
  const userId = Number(localStorage.getItem("id"));
  let UserCart: CartType;
  try {
    // Debug userId
    console.log("UserId being used:", userId);

    // Add timeout to fetch request
    const response = await fetch(
      `http://localhost:9090/api/shopping-cart/customer/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Increased timeout for testing
        signal: AbortSignal.timeout(10000),
      }
    );

    // Debug response
    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data:", data);

    UserCart = data;
    return UserCart?.shoppingCartDTOId;
  } catch (error) {
    // More detailed error logging
    console.error("Full error details:", {
      error,
      userId,
      url: `http://localhost:9090/api/shopping-cart/customer/${userId}`,
    });
    throw error;
  }
};

interface handleAddToCartProp {
  shoppingCartId: number;
  productId: number;
  quantity: number;
}

export const handleAddToCart = async (product: handleAddToCartProp) => {
  try {
    // Wait for cart ID
    const cartId = await getCartId();
    if (!cartId) {
      throw new Error("Could not get cart ID");
    }

    const response = await fetch(
      "http://localhost:9090/api/shoppingcartitems/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...product,
          shoppingCartId: cartId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add item to cart: ${response.status}`);
    }

    alert("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add item to cart");
  }
};

// Test function to verify API
export const testCartAPI = async () => {
  try {
    const response = await fetch(
      "http://localhost:9090/api/shopping-cart/customer",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("API Test Response:", data);
  } catch (error) {
    console.error("API Test Error:", error);
  }
};
