import { VendorProfile } from "@/types/vendorProfile";
export const getAllVendorProfile = async (venderId : string | number) => {
    try {
        const response = await fetch(`http://localhost:9090/api/vendor-profiles/vendor/${venderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },

        });
        if (!response.ok) {
            throw new Error(`Failed to fetch vendor profiles: ${response.status}`);
        }
        const data = await response.json();
        return data as VendorProfile;

    } catch (error) {
        console.error("Error fetching vendor profiles:", error);
        throw new Error("Failed to fetch vendor profiles");
        
    }
}