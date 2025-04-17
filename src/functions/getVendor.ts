export const getVendor = async (vendorId: string) => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/vendors/${vendorId}`,
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
