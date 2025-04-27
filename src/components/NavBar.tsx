import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MessageCircle as MessageIcon,
} from "lucide-react";
import {
IoCubeOutline as OrderIcon,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { ProductType } from "@/types/product";
import { getAllProducts } from "@/functions/allProducts";

//fix this categoryList so it works with the dropdown Menu

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

  return (
    <header className=" w-full border-b  fixed top-0 left-0 right-0 z-50 bg-[#29b554] ">
      <div className="container flex h-16 items-center px-4 sm:px-6">
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
              ></a>
            </div>
            <div className="mt-8 px-7">
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
                      <DropdownMenuItem key={key}>{value}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <nav className="mt-6 flex flex-col gap-4 px-7">
              <a
                href="/"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/products"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="/deals"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </a>
              <a
                href="/contact"
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a
          href="/"
          className="mr-4 mt-4  flex items-center justify-center  md:mr-6"
        >
          <img src="../public/Quick.png" className="p-1 h-[100px]  " alt="" />
        </a>
        <div className="hidden flex-1 md:flex md:gap-x-6">
          <div className="relative flex-1 max-w-md">
            <Link to={`/product-search/${search}`}>
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </Link>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">All Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {Object.entries(categoryList).map(([Key, value]) => {
                return (
                  <Link key={Key} to={`/category/${Key}`}>
                    <DropdownMenuItem key={Key}>{value}</DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Link to="/messages">
            <Button variant="ghost" size="icon">
              <MessageIcon className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link to={"/orders"} >
          <Button variant="ghost" size="icon">
            <OrderIcon className="h-5 w-5" />
            <span className="sr-only">Orders</span>
          </Button>
          </Link>
          <a href="/account" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
