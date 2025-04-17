import { useEffect, useState } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Import Popover components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { ProductType } from "@/types/product";
import { getAllProducts } from "@/functions/allProducts";

const categoryList = {
  1: "Electronics",
  2: "Clothing",
  3: "Home & Kitchen",
  4: "Beauty & Personal Care",
  5: "Sports & Outdoors",
  6: "Toys & Games",
  7: "Books",
  8: "Health & Personal Care",
  9: "Automotive",
  10: "Pet Supplies",
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  // State for filtered search results
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  // State to control popover visibility based on input focus
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        if (response) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search input
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts([]);
      return; // Clear results if search is empty
    }

    if (products.length > 0) {
      const lowerCaseSearch = search.toLowerCase();
      const results = products
        .filter(
          (product) => product.name.toLowerCase().includes(lowerCaseSearch),
          // You could also search in description, category, etc.
          // || product.description.toLowerCase().includes(lowerCaseSearch)
        )
        .slice(0, 8); // Limit the number of suggestions shown (e.g., top 8)

      setFilteredProducts(results);
    }
  }, [search, products]); // Re-run when search term or products list changes

  // Function to handle clicking a suggestion
  const handleSuggestionClick = (productId: string | number) => {
    // Assuming productId is string or number
    setSearch(""); // Clear search input
    setFilteredProducts([]); // Clear suggestions
    setIsSearchFocused(false); // Close popover
    navigate(`/product/${productId}`); // Navigate to product page (update path if needed)
  };

  // --- Component Return ---
  return (
    <header className=" w-full border-b fixed top-0 left-0 right-0 z-50 bg-[#29b554] ">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* --- Mobile Menu --- */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <a
                href="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Maybe add mobile logo here? */}
              </a>
            </div>
            <div className="mt-8 px-7">
              {/* Consider adding search suggestions to mobile too if desired */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-8" />
              </div>
              <div className="mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      All Categories
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    {Object.entries(categoryList).map(([key, value]) => (
                      <Link
                        key={key}
                        to={`/category/${key}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <DropdownMenuItem>{value}</DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <nav className="mt-6 flex flex-col gap-4 px-7">
              {/* Mobile Nav Links */}
              <Link
                to="/"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {/* Add other links */}
            </nav>
          </SheetContent>
        </Sheet>

        {/* --- Logo --- */}
        <Link
          to="/" // Use Link for internal navigation
          className="mr-4 mt-4 flex items-center justify-center md:mr-6"
        >
          {/* Ensure path to image is correct */}
          <img
            src="/Quick.png"
            className="p-1 h-[50px] md:h-[60px]"
            alt="Quick Logo"
          />
        </Link>

        {/* --- Desktop Search & Categories --- */}
        <div className="hidden flex-1 md:flex md:items-center md:gap-x-6">
          {/* Search Input with Popover Suggestions */}
          <Popover
            open={
              isSearchFocused &&
              search.trim() !== "" &&
              filteredProducts.length > 0
            }
          >
            <PopoverTrigger asChild>
              {/* The trigger needs a DOM element child, Input works directly,
                  but wrapping in div allows better width control for PopoverContent */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    // Delay hiding popover to allow clicking on suggestions
                    setTimeout(() => {
                      setIsSearchFocused(false);
                    }, 150); // 150ms delay
                  }}
                  placeholder="Search products..."
                  className="pl-8"
                  aria-label="Search products" // Accessibility
                />
              </div>
            </PopoverTrigger>

            {/* Suggestions Popover Content */}
            <PopoverContent
              className="w-[--radix-popover-trigger-width] max-h-[400px] overflow-y-auto p-0 mt-1" // Match trigger width, add scroll, remove padding, add margin-top
              align="start" // Align to the start (left) of the trigger
              sideOffset={5} // Small gap between input and popover
              onOpenAutoFocus={(e) => e.preventDefault()} // Prevent autofocus stealing from input
            >
              {loading && search.trim() !== "" ? ( // Show loading only if searching
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <div className="flex flex-col">
                  {filteredProducts.map((product) => (
                    // Use Button/div with onClick instead of Link to prevent full page reload if needed,
                    // but Link is usually fine and semantically correct here.
                    <button
                      key={product.productId} // Use a unique product ID
                      className="block w-full text-left p-2 hover:bg-accent text-sm rounded-sm"
                      // Use the handler function
                      onClick={() => handleSuggestionClick(product.productId)}
                      // Optional: Add product image/details
                      // <img src={product.image} alt="" className="w-8 h-8 mr-2 inline-block object-contain"/>
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
              {/* Optional: Show 'No results' only if not loading and search has text */}
              {!loading &&
                search.trim() !== "" &&
                filteredProducts.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No products found.
                  </div>
                )}
            </PopoverContent>
          </Popover>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">All Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {Object.entries(categoryList).map(([key, value]) => (
                // Wrap DropdownMenuItem with Link for navigation
                <Link key={key} to={`/category/${key}`}>
                  <DropdownMenuItem>{value}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* --- Right Icons (Cart, Account) --- */}
        <div className="flex items-center gap-2 ml-auto">
          <Link to="/cart">
            {" "}
            {/* Use Link */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {/* Replace '3' with dynamic cart item count */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link to="/account" className="hidden md:block">
            {" "}
            {/* Use Link */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
