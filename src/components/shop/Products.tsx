import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Card } from "components/ui/card";

interface productType {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  isDigital: boolean;
  mainImage: string;
  images: { product_id: number; source: string; image_id: number }[];
  categoriesID: number[];
  categories: { id: number; name: string }[];
}

const Products = () => {
  const [products, setProducts] = useState<productType[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = (await response.json()) as productType[];
      setProducts(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchProducts().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Card className="mt-5 w-[80%] bg-black p-5">
        <h1 className=" text-center text-3xl font-bold text-white">Produkty</h1>
      </Card>
      <div className="flex h-[90vh] w-[80%] flex-wrap justify-around">
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
