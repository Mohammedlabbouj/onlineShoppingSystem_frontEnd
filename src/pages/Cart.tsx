import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { getCartId } from "@/functions/CartFunctions";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Xbox Elite Wireless Controller Series 2",
      price: 70,
      quantity: 3,
      image:
        "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/461cf7a8c7b27c64fc3f8fed176f62a9/width(1200).png",
    },
    {
      id: 2,
      name: "Nike Sportswear Club Fleece Hoodie",
      price: 55,
      quantity: 1,
      image:
        "https://cdn.shoplightspeed.com/shops/608356/files/21440878/nike-nike-sportswear-club-fleece-pullover-hoodie-b.jpg",
    },
  ]);

  useEffect(() => {
    const hello = () => {
      let id = getCartId();
    };
    hello();
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container px-4">
          <h1 className="text-2xl font-bold mb-6">Shopping cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden rounded-xl">
                <div className="p-6">
                  <div className="flex justify-end mb-2">
                    <span className="font-medium">Price</span>
                  </div>

                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-medium mb-2">{item.name}</h3>

                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <span className="px-4 py-1">{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => deleteItem(item.id)}
                              className="ml-4 text-blue-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="font-medium text-right">
                          {item.price}$
                        </div>
                      </div>

                      {index < cartItems.length - 1 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}

                  <div className="mt-6 flex justify-end">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      Add an other item
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="rounded-xl p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Subtotal ({totalItems} items):
                    </span>
                    <span className="font-medium">{subtotal}$</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-medium">
                  Proceed to checkout
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
