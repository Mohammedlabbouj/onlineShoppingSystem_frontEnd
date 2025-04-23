import type React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Check } from "lucide-react";
import OrderReviewPopup from "@/components/OrderReviewPopup";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemDTO {
  cartItemId: number;
  productId: number;
  quantity: number;
  shoppingCartId: number;
}

interface CartDTO {
  shoppingCartDTOId: number;
  customerId: number;
  cartItems: CartItemDTO[];
}

interface Address {
  country: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
}

interface PaymentMethod {
  cardNumber: string;
  nameOnCard: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
}

export default function CheckoutPage() {
  const { idCart } = useParams<{ idCart: string }>();
  const [address, setAddress] = useState<Address | null>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [addressForm, setAddressForm] = useState<Address>({
    country: "",
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const getCustomerAddress = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/shipping-addresses/customer/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch address");
        }
        const data: {
          city: string;
          country: string;
          customerId: number;
          fullName: string;
          phoneNumber: string;
          postalCode: string;
          state: string;
          street: string;
        }[] = await response.json();
        setAddress({
          country: data[0].country,
          fullName: data[0].fullName,
          phoneNumber: data[0].phoneNumber,
          streetAddress: data[0].street,
          city: data[0].city,
          region: data[0].state,
          postalCode: data[0].postalCode,
        });
        setAddressForm({
          country: data[0].country,
          fullName: data[0].fullName,
          phoneNumber: data[0].phoneNumber,
          streetAddress: data[0].street,
          city: data[0].city,
          region: data[0].state,
          postalCode: data[0].postalCode,
        } as Address);
        console.log("Address data:", data);
      } catch (error) {
        throw new Error("Failed to fetch address");
      }
    };
    getCustomerAddress();

    const getAllProductsFromCart = async () => {
      try {
        const cartResponse = await fetch(
          `http://localhost:9090/api/shopping-cart/${idCart}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        if (!cartResponse.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const cartData: CartDTO = await cartResponse.json();

        const cartItemsWithDetails = await Promise.all(
          cartData.cartItems.map(async (item) => {
            const productResponse = await fetch(
              `http://localhost:9090/api/products/${item.productId}`,
            );

            if (!productResponse.ok) {
              throw new Error(`Failed to fetch product ${item.productId}`);
            }

            const product = await productResponse.json();

            return {
              id: item.cartItemId,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              image: product.image,
            };
          }),
        );

        setCartItems(cartItemsWithDetails);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    getAllProductsFromCart();
  }, []);

  const creatShippingAddress = async (addressData: Address) => {
    // Use addressData directly instead of the 'address' state variable
    console.log("Creating shipping address with data:", addressData);
    const response = await fetch(
      "http://localhost:9090/api/shipping-addresses/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          street: addressData.streetAddress, // Use parameter
          city: addressData.city, // Use parameter
          state: addressData.region, // Use parameter
          country: addressData.country, // Use parameter
          postalCode: addressData.postalCode, // Use parameter
          fullName: addressData.fullName, // Use parameter
          phoneNumber: addressData.phoneNumber, // Use parameter
          customerId: localStorage.getItem("id"),
        }),
      },
    );

    // It's good practice to check the response and potentially throw an error
    if (!response.ok) {
      const errorData = await response.text(); // Or response.json() if API returns JSON error
      console.error("Error creating shipping address:", errorData);
      throw new Error("Failed to create shipping address"); // Throw error to be caught
    } else {
      console.log("Shipping address created successfully");
      // Optionally return data if needed
      // const result = await response.json();
      // return result;
    }
  };

  const [paymentForm, setPaymentForm] = useState<PaymentMethod>({
    cardNumber: "",
    nameOnCard: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Make the handler async
  const handleAddressSubmit = async () => {
    setAddress(addressForm); // Update the UI state (this is still async visually)

    try {
      // Pass the current form data directly to the API function
      await creatShippingAddress(addressForm);
      setIsAddressDialogOpen(false); // Close dialog only on success
    } catch (error) {
      // Handle the error, e.g., show a message to the user
      console.error("Submission failed:", error);
      // Maybe set an error state here to display in the dialog
    }
  };

  const handlePaymentSubmit = () => {
    setPaymentMethod(paymentForm);
    setIsPaymentDialogOpen(false);
  };
  const navigate = useNavigate();
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPlacedOrder(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const TotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container px-4">
          <h1 className="text-2xl font-bold mb-6">Secure checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Delivery Address Section */}
              <Card className="rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Delivery address</h2>

                {address ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">{address.fullName}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {address.streetAddress}
                    </p>
                    <p className="text-muted-foreground">
                      {address.city}, {address.region} {address.postalCode}
                    </p>
                    <p className="text-muted-foreground">{address.country}</p>
                    <p className="text-muted-foreground">
                      {address.phoneNumber}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setIsAddressDialogOpen(true)}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="bg-amber-400 hover:bg-amber-500 text-black"
                    onClick={() => setIsAddressDialogOpen(true)}
                  >
                    add a delivery address
                  </Button>
                )}
              </Card>

              {/* Payment Methods Section */}
              <Card className="rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Payment methods</h2>

                {paymentMethod ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium">
                        •••• •••• •••• {paymentMethod.cardNumber.slice(-4)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {paymentMethod.nameOnCard}
                    </p>
                    <p className="text-muted-foreground">
                      Expires: {paymentMethod.expirationMonth}/
                      {paymentMethod.expirationYear}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setIsPaymentDialogOpen(true)}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  address && (
                    <Button
                      className="bg-amber-400 hover:bg-amber-500 text-black"
                      onClick={() => setIsPaymentDialogOpen(true)}
                    >
                      add your debit/credit card
                    </Button>
                  )
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="rounded-xl p-6">
                {!address && (
                  <Button
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black mb-6"
                    onClick={() => setIsAddressDialogOpen(true)}
                  >
                    add a delivery address
                  </Button>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>
                      {address && paymentMethod ? cartItems.length : "----"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping handling:</span>
                    <span> {address && paymentMethod ? "10$" : "----"} </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Order Total:</span>
                    <span>
                      {address && paymentMethod ? TotalPrice + "$" : "----"}
                    </span>
                  </div>
                </div>
                {address && paymentMethod && (
                  <Button
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-black mb-6"
                    onClick={() => setIsPopupVisible(true)}
                  >
                    Review items and shipping
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      {isPopupVisible && (
        <div
          onClick={() => {
            setIsPopupVisible(false);
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
        >
          <OrderReviewPopup
            items={cartItems}
            shippingCost={10}
            idCart={idCart}
            setIsPopupVisible={handleClosePopup}
          />
        </div>
      )}

      {placedOrder && (
        <div
          onClick={() => {
            setPlacedOrder(false);
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {/* A Popup with message if user made Order */}
            <h2 className="text-xl font-bold text-green-600 mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-700">
              Your order has been placed successfully.
            </p>
          </div>
        </div>
      )}

      {/* Address Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a delivery address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="country">Country/Region</Label>
              <Input
                id="country"
                name="country"
                value={addressForm.country}
                onChange={handleAddressChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={addressForm.fullName}
                onChange={handleAddressChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={addressForm.phoneNumber}
                onChange={handleAddressChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={addressForm.streetAddress}
                onChange={handleAddressChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region/District</Label>
                <Input
                  id="region"
                  name="region"
                  value={addressForm.region}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={addressForm.postalCode}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-amber-400 hover:bg-amber-500 text-black"
              onClick={handleAddressSubmit}
            >
              Add this Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add your card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nameOnCard">Name on card</Label>
              <Input
                id="nameOnCard"
                name="nameOnCard"
                value={paymentForm.nameOnCard}
                onChange={handlePaymentChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Expiration Date</Label>
              <div className="flex gap-4">
                <Select
                  value={paymentForm.expirationMonth}
                  onValueChange={(value) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      expirationMonth: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0");
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select
                  value={paymentForm.expirationYear}
                  onValueChange={(value) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      expirationYear: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString();
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="securityCode">Security Code (CVV/CVC)</Label>
              <Input
                id="securityCode"
                name="securityCode"
                value={paymentForm.securityCode}
                onChange={handlePaymentChange}
                maxLength={4}
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                QuickCart accept all majors Debit/Credit Cards
              </p>
              <div className="flex gap-2 mt-2">
                <div className="w-10 h-6 bg-blue-500 rounded"></div>
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-red-600 rounded"></div>
                <div className="w-10 h-6 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="sm:flex-1 bg-amber-400 hover:bg-amber-500 text-black"
              onClick={handlePaymentSubmit}
            >
              Add this Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
