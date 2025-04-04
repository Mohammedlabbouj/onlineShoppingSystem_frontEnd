
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Check } from "lucide-react"

interface Address {
  country: string
  fullName: string
  phoneNumber: string
  streetAddress: string
  city: string
  region: string
  postalCode: string
}

interface PaymentMethod {
  cardNumber: string
  nameOnCard: string
  expirationMonth: string
  expirationYear: string
  securityCode: string
}

export default function CheckoutPage() {
  const [address, setAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  const [addressForm, setAddressForm] = useState<Address>({
    country: "",
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
  })

  const [paymentForm, setPaymentForm] = useState<PaymentMethod>({
    cardNumber: "",
    nameOnCard: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressSubmit = () => {
    setAddress(addressForm)
    setIsAddressDialogOpen(false)
  }

  const handlePaymentSubmit = () => {
    setPaymentMethod(paymentForm)
    setIsPaymentDialogOpen(false)
  }

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
                    <p className="text-muted-foreground">{address.streetAddress}</p>
                    <p className="text-muted-foreground">
                      {address.city}, {address.region} {address.postalCode}
                    </p>
                    <p className="text-muted-foreground">{address.country}</p>
                    <p className="text-muted-foreground">{address.phoneNumber}</p>
                    <Button variant="outline" className="mt-2" onClick={() => setIsAddressDialogOpen(true)}>
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
                      <span className="font-medium">•••• •••• •••• {paymentMethod.cardNumber.slice(-4)}</span>
                    </div>
                    <p className="text-muted-foreground">{paymentMethod.nameOnCard}</p>
                    <p className="text-muted-foreground">
                      Expires: {paymentMethod.expirationMonth}/{paymentMethod.expirationYear}
                    </p>
                    <Button variant="outline" className="mt-2" onClick={() => setIsPaymentDialogOpen(true)}>
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

              {/* Place Order Button */}
              {address && paymentMethod && (
                <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-medium py-6 text-lg">
                  Place your order
                </Button>
              )}
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
                    <span>—</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping handling:</span>
                    <span>—</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Order Total:</span>
                    <span>99$</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Address Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a delivery address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="country">Country/Region</Label>
              <Input id="country" name="country" value={addressForm.country} onChange={handleAddressChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={addressForm.fullName} onChange={handleAddressChange} />
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
                <Input id="city" name="city" value={addressForm.city} onChange={handleAddressChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region/District</Label>
                <Input id="region" name="region" value={addressForm.region} onChange={handleAddressChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" name="postalCode" value={addressForm.postalCode} onChange={handleAddressChange} />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black" onClick={handleAddressSubmit}>
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
              <Input id="nameOnCard" name="nameOnCard" value={paymentForm.nameOnCard} onChange={handlePaymentChange} />
            </div>
            <div className="grid gap-2">
              <Label>Expiration Date</Label>
              <div className="flex gap-4">
                <Select
                  value={paymentForm.expirationMonth}
                  onValueChange={(value) => setPaymentForm((prev) => ({ ...prev, expirationMonth: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0")
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <Select
                  value={paymentForm.expirationYear}
                  onValueChange={(value) => setPaymentForm((prev) => ({ ...prev, expirationYear: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString()
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      )
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
              <p className="text-sm text-muted-foreground">QuickCart accept all majors Debit/Credit Cards</p>
              <div className="flex gap-2 mt-2">
                <div className="w-10 h-6 bg-blue-500 rounded"></div>
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-red-600 rounded"></div>
                <div className="w-10 h-6 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:flex-1" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="sm:flex-1 bg-amber-400 hover:bg-amber-500 text-black" onClick={handlePaymentSubmit}>
              Add this Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


