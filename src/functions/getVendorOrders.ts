import { Order } from "@/types/orders";

export const getOrders = async (vendorId: string) => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/orders/vendor/${vendorId}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data", data);

    return data as Order[];
  } catch (error) {}
};
