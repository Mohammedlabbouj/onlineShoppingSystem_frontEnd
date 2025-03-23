import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface CustomerFormData {
  username: string;
  sex: string; // Changed from gender to sex
  birthdate: string;
  age: number; // Added age field
  email: string;
  password: string;
}

// Update VendorFormData interface to match both tables
interface VendorFormData {
  username: string;
  email: string;
  password: string;
  description: string;
  store_image: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState("customer");

  const [formDataCustomer, setFormDataCustomer] = useState<CustomerFormData>({
    username: "",
    sex: "", // Changed from gender to sex
    birthdate: "",
    age: 0, // Added age initialization
    email: "",
    password: "",
  });

  const [formDataVendor, setFormDataVendor] = useState<VendorFormData>({
    username: "",
    email: "",
    password: "",
    description: "",
    store_image: "",
  });

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "birthdate") {
      const age = calculateAge(value);
      setFormDataCustomer((prev) => ({
        ...prev,
        [name]: value,
        age: age,
      }));
    } else {
      setFormDataCustomer((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleVendorInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormDataVendor({
      ...formDataVendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (userType === "vendor") {
        // First create the vendor
        const vendorResponse = await fetch(
          "http://localhost:9090/api/vendors/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formDataVendor.username,
              email: formDataVendor.email,
              password: formDataVendor.password,
            }),
          }
        );

        if (!vendorResponse.ok) {
          throw new Error("Vendor creation failed");
        }

        const vendor = await vendorResponse.json();
        console.log("Created vendor:", vendor); // Debug log

        // Ensure we have a vendor_id before proceeding
        // if (!vendor.vendor_id) {
        //   throw new Error("Vendor ID not received from server");
        // }

        // Then create the vendor profile
        const vendorProfile = {
          store_name: formDataVendor.username,
          description: formDataVendor.description,
          store_image: formDataVendor.store_image,
          rating: 0,
          vendor_id: vendor.vendor_id,
        };

        console.log("Sending vendor profile:", vendorProfile); // Debug log

        const profileResponse = await fetch(
          "http://localhost:9090/api/vendor-profiles/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vendorProfile),
          }
        );

        if (!profileResponse.ok) {
          const errorData = await profileResponse.text();
          console.error("Profile creation error:", errorData); // Debug log
          throw new Error("Vendor profile creation failed");
        }

        const createdProfile = await profileResponse.json();
        console.log("Created profile:", createdProfile); // Debug log
      } else {
        // Existing customer creation code
        const response = await fetch(
          "http://localhost:9090/api/customers/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataCustomer),
          }
        );

        if (!response.ok) {
          throw new Error("Customer signup failed");
        }
      }

      // Redirect to login page on success
      navigate("/login");
    } catch (err) {
      console.error("Error in signup:", err); // Debug log
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md border mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="customer"
              checked={userType === "customer"}
              onChange={(e) => setUserType(e.target.value)}
              className="text-green-500"
            />
            <span>Customer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="vendor"
              checked={userType === "vendor"}
              onChange={(e) => setUserType(e.target.value)}
              className="text-green-500"
            />
            <span>Vendor</span>
          </label>
        </div>

        {userType === "customer" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formDataCustomer.username}
              onChange={handleCustomerInput}
              className="w-full border p-2 rounded-md"
              required
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={formDataCustomer.sex === "male"}
                  onChange={handleCustomerInput}
                  className="text-green-500"
                  required
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={formDataCustomer.sex === "female"}
                  onChange={handleCustomerInput}
                  className="text-green-500"
                />
                <span>Female</span>
              </label>
            </div>
            <div className="space-y-2">
              <input
                type="date"
                name="birthdate"
                value={formDataCustomer.birthdate}
                onChange={handleCustomerInput}
                className="w-full border p-2 rounded-md"
                required
                max={new Date().toISOString().split("T")[0]} // Prevents future dates
              />
              {formDataCustomer.age > 0 && (
                <div className="text-sm text-gray-600">
                  Age: {formDataCustomer.age} years old
                </div>
              )}
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formDataCustomer.email}
              onChange={handleCustomerInput}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formDataCustomer.password}
              onChange={handleCustomerInput}
              className="w-full border p-2 rounded-md"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username/StoreName"
              value={formDataVendor.username}
              onChange={handleVendorInput}
              className="w-full border p-2 rounded-md"
              required
            />
            <textarea
              name="description"
              placeholder="Store Description"
              value={formDataVendor.description}
              onChange={handleVendorInput}
              // className="w-full border p-2 rounded-md min-h-[100px]"
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="url"
              name="store_image"
              placeholder="Store Image URL"
              value={formDataVendor.store_image}
              onChange={handleVendorInput}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formDataVendor.email}
              onChange={handleVendorInput}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formDataVendor.password}
              onChange={handleVendorInput}
              className="w-full border p-2 rounded-md"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
            >
              {isLoading ? "Creating Store..." : "Create Store"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
