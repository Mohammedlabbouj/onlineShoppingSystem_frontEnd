import { useState } from "react";
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

export  default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              >
                {/* <span className="text-xl font-bold">ShopMart</span> */}
              </a>
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
                    <DropdownMenuItem>Electronics</DropdownMenuItem>
                    <DropdownMenuItem>Clothing</DropdownMenuItem>
                    <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
                    <DropdownMenuItem>Beauty & Personal Care</DropdownMenuItem>
                    <DropdownMenuItem>Sports & Outdoors</DropdownMenuItem>
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
        <a href="/" className="mr-4 mt-4  flex items-center justify-center  md:mr-6">
          <img src="../public/Quick.png" className="p-1 h-[100px]  "  alt=""  />
        </a>
        <div className="hidden flex-1 md:flex md:gap-x-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">All Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuItem>Clothing</DropdownMenuItem>
              <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
              <DropdownMenuItem>Beauty & Personal Care</DropdownMenuItem>
              <DropdownMenuItem>Sports & Outdoors</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <a href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </a>
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
