// src/pages/VendorDashboard.tsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import ProductCard from '../components/ProductCard';
import { Product, Stat, StoreInfo, Vendor } from '../types/vendor'; // Adjust path

// Import icons from react-icons
import { IoCartOutline, IoCubeOutline, IoPricetagsOutline, IoSwapHorizontalOutline } from "react-icons/io5";

const VendorDashboard: React.FC = () => {
  // --- Mock Data (Replace with API calls) ---
  const [activePage] = useState<'Dashboard' | 'Products' | 'Reviews'>('Dashboard');

  const storeInfo: StoreInfo = {
      name: "Store Name",
      pictureUrl: undefined // Add a URL for a real picture
  };

  const vendor: Vendor = {
      name: "mr vendor"
  };

  const stats: Stat[] = [
    { title: 'Total orders', value: 120, icon: IoCartOutline },
    { title: 'Pending Shipping', value: 10, icon: IoSwapHorizontalOutline },
    { title: 'Top Sales', value: 5, icon: IoPricetagsOutline }, // Or a trending up icon
    { title: 'Out of Stock', value: 5, icon: IoCubeOutline },
  ];

  const products: Product[] = [
    { id: 1, name: 'Sony PlayStation 5 DualSense Wireless Controller', imageUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Controller1', price: 199, quantity: 10 },
    { id: 2, name: 'Another PS5 DualSense Wireless Controller', imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=Controller2', price: 199, quantity: 10 },
    { id: 3, name: 'Wireless Controller PS5 DualSense Sony', imageUrl: 'https://via.placeholder.com/150/666666/FFFFFF?text=Controller3', price: 199, quantity: 10 },
    { id: 4, name: 'PlayStation 5 Controller DualSense Wireless', imageUrl: 'https://via.placeholder.com/150/999999/FFFFFF?text=Controller4', price: 199, quantity: 10 },
    // Add more mock products
  ];

  // --- Event Handlers (Implement actual logic) ---
  const handleDeleteProduct = (id: string | number) => {
    console.log('Delete product:', id);
    // Call API, update state, etc.
  };

  const handleEditProduct = (id: string | number) => {
    console.log('Edit product:', id);
    // Navigate to edit page or open modal
  };

   const handleAddNewProduct = () => {
    console.log('Add new product clicked');
    // Navigate to add product page or open modal
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} />

      {/* Main Content Area - Offset by sidebar width */}
      <main className="flex-1 ml-64 p-6 md:p-8"> {/* Adjust ml-64 to match sidebar width */}
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {storeInfo.pictureUrl ? (
                 <img src={storeInfo.pictureUrl} alt="Store" className="w-14 h-14 rounded-full border-2 border-green-500 object-cover"/>
            ) : (
                <div className="w-14 h-14 rounded-full bg-green-200 border-2 border-green-500 flex items-center justify-center text-green-600 text-xs font-semibold">
                    Store picture
                </div>
            )}
            <h1 className="text-xl font-semibold text-gray-700">{storeInfo.name}</h1>
          </div>
          <span className="text-lg text-gray-800">Welcome {vendor.name}</span>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </section>

        {/* Recently Added Products Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Recently added product</h2>
            <button
                onClick={handleAddNewProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
            >
              Add a new product
            </button>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                />
              ))}
            </div>
           ) : (
             <div className="text-center py-10 text-gray-500">
                No products added yet.
             </div>
           )}
        </section>
      </main>
    </div>
  );
};

export default VendorDashboard;
