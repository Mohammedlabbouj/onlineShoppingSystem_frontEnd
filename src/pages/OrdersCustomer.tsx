import { useEffect, useState } from "react";
import { getProductFunction } from "@/functions/getProduct";
import { getOrders } from "@/functions/getOrders";
import { getAllVendorProfile } from "@/functions/getAllVendorProfile";
import { Order, OrderItem } from "@/types/orders";
import { ProductType } from "@/types/product";
import { VendorProfile } from "@/types/vendorProfile";
import Loading from "@/components/Loading";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orderProducts, setOrderProducts] = useState<
    Record<string, ProductType>
  >({});
  const [loading, setLoading] = useState(true);
  const [allVendorProfile, setAllVendorProfile] = useState<
    Record<string, VendorProfile>
  >({});
  const [allVendorProfileLoading, setAllVendorProfileLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Using a placeholder customer ID - replace with actual ID in production
        const data = await getOrders(localStorage.getItem("id") as string);

        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchVendorProfiles = async () => {
      try {
        const vendorProfilePromises = orders.map((order) =>
          getAllVendorProfile(order.vendorId)
        );
        const vendorProfiles = await Promise.all(vendorProfilePromises);

        const vendorProfileMap = vendorProfiles.reduce((acc, profile) => {
          acc[profile.vendorId] = profile;
          return acc;
        }, {} as Record<string, VendorProfile>);
        console.log("vendorMap : ", vendorProfileMap);
        setAllVendorProfile(vendorProfileMap);
        console.log("allVendor : ", allVendorProfile);
      } catch (error) {
        console.error("Failed to fetch vendor profiles:", error);
      } finally {
        setAllVendorProfileLoading(false);
      }
    };

    if (orders.length > 0) {
      fetchVendorProfiles();
    }
  }, [orders]);
  function getVendorProfile(vendorid: number): string {
    const vendorProfile = allVendorProfile[vendorid];
    if (vendorProfile) {
      return vendorProfile.storeName;
    } else {
      return "Loading...";
    }
  }

  const fetchProductDetails = async (orderId: number, items: OrderItem[]) => {
    try {
      const productPromises = items.map((item) =>
        getProductFunction(item.productId)
      );
      const products = await Promise.all(productPromises);

      const productMap = products.reduce((acc, product, index) => {
        acc[items[index].productId] = product;
        return acc;
      }, {} as Record<string, ProductType>);

      setOrderProducts((prev) => ({ ...prev, ...productMap }));
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const toggleOrderExpansion = async (orderId: number, items: OrderItem[]) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
      await fetchProductDetails(orderId, items);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-200 text-amber-800";
      case "shipping":
        return "bg-cyan-400 text-cyan-800";
      case "delivered":
        return "bg-green-300 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const groupOrdersByStatus = () => {
    const grouped: Record<string, Order[]> = {
      pending: [],
      shipping: [],
      delivered: [],
    };

    orders.forEach((order) => {
      const status = order.status.toLowerCase();
      if (grouped[status]) {
        grouped[status].push(order);
      } else {
        grouped.pending.push(order);
      }
    });

    return grouped;
  };

  const groupedOrders = groupOrdersByStatus();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Pending Orders Section */}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-emerald-500 text-white p-[10px] mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">pending orders</h2>
        </div>

        <div className="space-y-4 p-4">
          {groupedOrders.pending.map((order) => (
            <div
              key={order.orderDTOId}
              className="border border-gray-200 rounded-lg"
            >
              <div
                className="grid grid-cols-4 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  toggleOrderExpansion(order.orderDTOId, order.items)
                }
              >
                <div className="font-medium">
                  {" "}
                  {getVendorProfile(order.vendorId)}{" "}
                </div>
                <div>{order.date ? order.date : "no date...!"}</div>
                <div>{order.totalAmount} </div>
                <div className="flex justify-end">
                  <span className="px-4 py-1 rounded-full bg-amber-200 text-amber-800 font-medium">
                    pending
                  </span>
                </div>
              </div>

              {expandedOrderId === order.orderDTOId && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {order.items.map((item) => {
                    const product = orderProducts[item.productId];
                    return (
                      <div
                        key={item.orderId}
                        className="grid grid-cols-4 py-4 items-center border-b border-gray-200 last:border-0"
                      >
                        <div className="flex justify-center">
                          {product && (
                            <img
                              src={
                                product.image ||
                                "/placeholder.svg?height=80&width=80"
                              }
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div> {product ? product.name : "Loading..."} </div>
                        <div>{item.quantity} </div>
                        <div>{item.priceAtPurchase} </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Orders Section */}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-emerald-500 text-white p-[10px] mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shipping Orders</h2>
        </div>
        <div className="space-y-4 p-4">
          {groupedOrders.shipping.map((order) => (
            <div
              key={order.orderDTOId}
              className="border border-gray-200 rounded-lg"
            >
              <div
                className="grid grid-cols-4 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  toggleOrderExpansion(order.orderDTOId, order.items)
                }
              >
                <div className="font-medium">
                  {" "}
                  {getVendorProfile(order.vendorId)}{" "}
                </div>
                <div>{order.date ? order.date : "no date...!"}</div>
                <div>{order.totalAmount} </div>
                <div className="flex justify-end">
                  <span className="px-4 py-1 rounded-full bg-amber-200 text-amber-800 font-medium">
                    pending
                  </span>
                </div>
              </div>

              {expandedOrderId === order.orderDTOId && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {order.items.map((item) => {
                    const product = orderProducts[item.productId];
                    return (
                      <div
                        key={item.orderId}
                        className="grid grid-cols-4 py-4 items-center border-b border-gray-200 last:border-0"
                      >
                        <div className="flex justify-center">
                          {product && (
                            <img
                              src={
                                product.image ||
                                "/placeholder.svg?height=80&width=80"
                              }
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div> {product ? product.name : "Loading..."} </div>
                        <div>{item.quantity} </div>
                        <div>{item.priceAtPurchase} </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delivered Orders Section */}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-emerald-500 text-white p-[10px] mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Delivered Orders</h2>
        </div>
        <div className="space-y-4 p-4">
          {groupedOrders.delivered.map((order) => (
            <div
              key={order.orderDTOId}
              className="border border-gray-200 rounded-lg"
            >
              <div
                className="grid grid-cols-4 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  toggleOrderExpansion(order.orderDTOId, order.items)
                }
              >
                <div className="font-medium">
                  {" "}
                  {getVendorProfile(order.vendorId)}{" "}
                </div>
                <div>{order.date ? order.date : "no date...!"}</div>
                <div>{order.totalAmount} </div>
                <div className="flex justify-end">
                  <span className="px-4 py-1 rounded-full bg-amber-200 text-amber-800 font-medium">
                    pending
                  </span>
                </div>
              </div>

              {expandedOrderId === order.orderDTOId && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {order.items.map((item) => {
                    const product = orderProducts[item.productId];
                    return (
                      <div
                        key={item.orderId}
                        className="grid grid-cols-4 py-4 items-center border-b border-gray-200 last:border-0"
                      >
                        <div className="flex justify-center">
                          {product && (
                            <img
                              src={
                                product.image ||
                                "/placeholder.svg?height=80&width=80"
                              }
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div> {product ? product.name : "Loading..."} </div>
                        <div>{item.quantity} </div>
                        <div>{item.priceAtPurchase} </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
