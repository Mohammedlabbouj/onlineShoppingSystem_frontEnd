import { useRef, useEffect, useState } from "react";
import { User } from "../pages/Loging"; // Assuming correct paths
import { Product } from "../pages/Home"; // Assuming correct paths
import Loading from "./Loading"; // Assuming correct path
import { Link } from "react-router-dom";

function ForYouSection() {
  // --- ALL HOOKS MUST BE AT THE TOP ---
  const [user] = useState<User>({
    customerId: Number(localStorage.getItem("id")),
    email: String(localStorage.getItem("email")),
    username: String(localStorage.getItem("username")),
    password: String(localStorage.getItem("password")),
    sex: String(localStorage.getItem("gander")),
    age: Number(localStorage.getItem("age")),
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // <-- MOVED HERE

  // --- EFFECT HOOK ---
  useEffect(() => {
    // Consider checking if user.customerId is valid before proceeding
    if (!user || !user.customerId) {
      setError("User data not found.");
      setIsLoading(false);
      return; // Exit early if no valid user
    }

    let category: number | undefined; // Allow undefined initially
    // Standardize sex comparison (lowercase)
    const userSex = user.sex.toLowerCase();

    if (userSex === "male" && user.age >= 18 && user.age <= 30) {
      category = 1;
    } else if (userSex === "male" && user.age > 30) {
      category = 2;
    } else if (userSex === "female" && user.age >= 18 && user.age <= 30) {
      category = 4;
    } else if (userSex === "female" && user.age > 30) {
      category = 5;
    } else {
      // Handle cases where category is not determined (e.g., age < 18 or unknown sex)
      setError("Could not determine product category for user.");
      setIsLoading(false);
      return; // Exit if no category applies
    }

    const getProductsByspecificcategoryId = async () => {
      // Reset state for new fetch
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:9090/api/products/specificcategory/${category}`, // Use determined category
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          const errorData = await response.text(); // Get more error info if possible
          throw new Error(
            `Failed to fetch products: ${response.status} ${errorData || response.statusText}`,
          );
        }
        const data: Product[] = await response.json(); // Assume API returns Product[]
        setProducts(shuffleArray(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setProducts([]); // Clear products on error
      } finally {
        setIsLoading(false);
      }
    };

    getProductsByspecificcategoryId();

    // Dependency array: Fetch when user ID, sex, or age changes.
    // Avoid depending on the whole user object if only specific fields trigger refetch.
  }, [user.customerId, user.sex, user.age]); // More specific dependencies

  // --- HELPER FUNCTIONS ---
  const shuffleArray = (array: Product[]) => {
    // Create a copy before sorting to avoid mutating the original (if needed elsewhere)
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === "left") {
        container.scrollTo({
          left: Math.max(0, currentScroll - scrollAmount),
          behavior: "smooth",
        });
      } else {
        container.scrollTo({
          left: Math.min(maxScroll, currentScroll + scrollAmount),
          behavior: "smooth",
        });
      }
    }
  };

  // --- CONDITIONAL RENDERING ---
  if (isLoading) {
    // Ensure Loading component doesn't cause layout shifts if possible
    return (
      <div className="p-4 md:p-6 max-w-5xl mx-auto font-sans h-48 flex items-center justify-center">
        {" "}
        {/* Placeholder height */}
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-5xl mx-auto font-sans text-red-600">
        Error: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
          For you
        </h2>
        <p className="text-gray-600">
          No products found based on your profile.
        </p>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="px-4 md:px-8 lg:px-16 py-4 md:py-6 font-sans">
      {" "}
      {/* Example: Increased horizontal padding */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
        For you
      </h2>
      <div className="flex items-center space-x-2 ">
        {" "}
        {/* Buttons + Scroll list container */}
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll("left")}
          aria-label="Scroll Left"
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          &lt;
        </button>
        {/* Items List - this part still scrolls horizontally */}
        <div
          ref={scrollContainerRef}
          className="flex flex-grow overflow-x-auto scroll-smooth space-x-4 py-4 px-2 border border-gray-200 rounded-3xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
bg-gray-100
          " // Added flex-grow, adjusted padding slightly
        >
          {products.map((item) => (
            <Link
              to={`/product/${item.productId}`}
              key={item.productId}
              className="flex-shrink-0 w-36 md:w-40 text-center block hover:opacity-90"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[200px] object-contain max-h-28 md:max-h-32 rounded-md mb-1 "
                loading="lazy"
              />
            </Link>
          ))}
        </div>
        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll("right")}
          aria-label="Scroll Right"
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ForYouSection;
