import { Card, CardContent, CardHeader } from "components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "components/ui/button";
import Link from "next/link";
import { useToast } from "components/ui/use-toast";

export type productType = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  mainImage: string;
  images: string[];
};
const ProductListItem = (props: {
  key: number;
  product: productType;
  onDelete: (productId: number) => void;
}) => {
  const { name, price, quantity, mainImage, product_id } = props.product;
  return (
    <li className="border-grey my-3 flex w-full flex-wrap  items-center justify-between border-b-2 py-2 text-sm md:flex-nowrap md:p-2 md:text-lg">
      <div className="flex w-full  items-center justify-around md:w-[70%] ">
        <div className="relative h-[70px] w-[70px] md:h-[100px] md:w-[100px]">
          <Image fill={true} alt="" src={mainImage} />
        </div>

        <div className="flex items-center">
          <p className="font-bold">{`${name}`}</p>
        </div>
        <div className=" flex flex-col flex-wrap items-center justify-center text-base ">
          <p className=""> {`Price: ${price}zł`}</p>
          <p> {`In magazine: ${quantity}`}</p>
        </div>
      </div>
      <div className=" my-2 flex w-full justify-around md:w-1/4">
        {/* <Button className=" bg-blue-400 p-4 text-sm hover:bg-blue-500 md:text-lg">
          Edytuj
        </Button> */}
        <Button
          onClick={props.onDelete.bind(null, product_id)}
          className=" bg-red-700 p-4 text-sm hover:bg-red-800 md:text-lg"
        >
          Usuń
        </Button>
      </div>
    </li>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = (await response.json()) as productType[];
      console.log(data);
      setProducts(data);
      setIsLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    fetchProducts().catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteProductHandler = async (product_id: number) => {
    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Coś poszło nie tak",
      });
      return;
    }

    await fetchProducts();
    toast({
      title: "Sukces",
      description: "Pomyślnie usunięto",
    });
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] w-full overflow-hidden md:w-[95%] ">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Products</h1>
        <div className="">
          <Button className=" px-6 py-6 hover:bg-orange-500">
            <Link href={"/admin/add/product"}>Dodaj produkt</Link>
          </Button>
        </div>
      </CardHeader>
      {!isLoading && (
        <CardContent className="my-2 max-h-[85%] w-full overflow-hidden overflow-y-scroll p-2 md:my-6">
          <ul className="flex flex-col ">
            {products.map((product) => (
              <ProductListItem
                key={product.product_id}
                product={product}
                onDelete={deleteProductHandler}
              />
            ))}
          </ul>
        </CardContent>
      )}
      {isLoading && <h2 className="text-center">Loading...</h2>}
    </Card>
  );
};
export default ProductList;
