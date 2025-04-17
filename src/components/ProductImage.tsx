import { Card } from "@/components/ui/card";
interface ProductImageProp {
  product: {
    image: string;
    name: string;
  };
}
export function ProductImage({ product }: ProductImageProp) {
  return (
    <>
      <Card className="p-6 flex items-center justify-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="max-w-full max-h-[400px] object-contain"
        />
      </Card>
    </>
  );
}


