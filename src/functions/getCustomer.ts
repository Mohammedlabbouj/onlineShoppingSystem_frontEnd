export const getCustomer = async (customerId:  number) => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/customers/${customerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vendor:", error);
  }
};
