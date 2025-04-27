import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductType } from '@/types/product';








// Price Display Component
interface PriceDisplayProps {
    price: number;
}
const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {


    return (
        <div className="flex items-baseline space-x-1">
            <span className="text-gray-800">
                <span className="text-xl font-semibold">{price}</span>
            </span>
        </div>
    );
};


// Product List Item Component
interface ProductListItemProps {
  product: ProductType;
}
const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const defaultImage = "https://placehold.co/150x200/F5F5F5/BDBDBD?text=No+Image";

  const handleAddToCart = () => {
      alert(`Added ${product.name} to cart!`);
      // Add actual cart logic here
  }

  return (
    <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-6 p-4 border-b border-gray-200 last:border-b-0">
      {/* Image Column */}
      <div className="w-full sm:w-1/5 flex-shrink-0 mb-4 sm:mb-0 flex justify-center">
        <img
          src={product.image || defaultImage}
          alt={product.name}
          className="w-32 h-auto sm:w-full sm:h-auto max-h-48 object-contain"
          onError={(e) => { e.currentTarget.src = defaultImage }}
        />
      </div>

      {/* Details Column */}
      <div className="flex-grow w-full sm:w-4/5">
        {/* Optional Badge */}


        {/* Product Name/Title */}
        <Link to={`/product/${product.productId}`}>
        <h2 className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer mb-1 line-clamp-3">
          {/* In a real app, wrap this in a Link from react-router-dom */}
          {product.name}
        </h2>
        </Link>

        {/* Optional Category */}
        {/* Rating and Purchase Info */}

            <p className="text-xs text-gray-600 mb-2">{product.description}</p>

        {/* Price */}
        <PriceDisplay price={product.price} /> 

        {/* Add to Cart Button */}
        <div className="mt-4">
            <button
                onClick={handleAddToCart}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500"
            >
                Add to cart
            </button>
        </div>
      </div>
    </div>
  );
};

const getProductBySearch = async (search : string | undefined)  =>{
  try {
   const response = await fetch (`http://localhost:9090/api/products/products/search/${search}`, {
    method: 'GET',
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
      }
    }) 
    const data = await response.json();
    return data;
  } catch (error) {
    
  }
}



// --- Main Application Component ---
export default function ProductSearch () {
  const {search} = useParams<{search: string}>();
  const [products , setProducts] = useState<ProductType[]>([]);
  // In a real app, you would fetch products based on search/filters
  useEffect(()=>{
    try {
      const fetchProducts = async () => {
        const data = await getProductBySearch(search);
        setProducts(data);
      }
      fetchProducts();
    }
    catch (error) {
      console.error("Error fetching products:", error);
    }
  },[])

  return (
    <div className="bg-white min-h-screen">
      {/* This container simulates the main content area */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-2">Results</h1>
        {/* Product List */}
        <div>
          {products.length > 0 ? (
            products.map(product => <ProductListItem key={product.productId} product={product} />)
          ) : (
            <p className="text-center text-gray-500 py-8">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};


