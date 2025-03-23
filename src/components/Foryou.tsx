import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "../pages/Loging";
import { Product } from "../pages/Home";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ForYou = () => {
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

  useEffect(() => {
    if (!user) return;

    let category: number;
    if (user.sex === "male" && user.age >= 18 && user.age <= 30) {
      category = 1;
      console.log(category);
    } else if (user.sex === "male" && user.age > 30) {
      category = 2;
    } else if (user.sex === "female" && user.age >= 18 && user.age <= 30) {
      category = 4;
    } else if (user.sex === "female" && user.age > 30) {
      category = 5;
    }
    const getProductsByspecificcategoryId = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:9090/api/products/specificcategory/${category}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProducts(shuffleArray(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "somthing worng happend");
      } finally {
        setIsLoading(false);
      }
    };
    getProductsByspecificcategoryId();
  }, [user]);
  const shuffleArray = (array : Product[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">For You</h2>
      <div className="flex gap-4 overflow-x-auto">
        {products.map((product: Product) => (
        <Link to={`/product/${product.productId}`} className="block">
          <Card key={product.productId} className="min-w-[200px] p-2">
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
                />
            </CardContent>
          </Card>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default ForYou;
