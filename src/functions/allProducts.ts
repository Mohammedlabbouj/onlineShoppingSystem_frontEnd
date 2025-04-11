import { ProductType } from "@/types/product";

let allProducts: ProductType[] = [];
export const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:9090/api/products/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    allProducts = data;
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};
