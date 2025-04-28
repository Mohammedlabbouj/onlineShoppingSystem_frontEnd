export const getProductFunction = async (id: string | number ) => {
  try {
    const response = await fetch(`http://localhost:9090/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};
