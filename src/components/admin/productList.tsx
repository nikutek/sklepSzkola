import { Card, CardContent, CardHeader } from "components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "components/ui/button";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Product 1",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 20.98,
    quantity: 45,
  },
  {
    id: "p2",
    name: "Product 2",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 25.28,
    quantity: 44,
  },
  {
    id: "p3",
    name: "Product 3",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 56.54,
    quantity: 11,
  },
  {
    id: "p4",
    name: "Product 4",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 21.98,
    quantity: 22,
  },
  {
    id: "p5",
    name: "Product 5",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 567.98,
    quantity: 25,
  },
  {
    id: "p6",
    name: "Product 6",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 567.98,
    quantity: 25,
  },
  {
    id: "p7",
    name: "Product 7",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 567.98,
    quantity: 25,
  },
];

const ProductListItem = (props: {
  key: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}) => {
  return (
    <li className="border-grey my-3 flex items-center justify-between  border-b-2  p-2 text-lg">
      <div className="flex w-[70%] justify-around">
        <Image width={100} height={100} alt="" src={props.image} />
        <div className="flex items-center">
          <p className="font-bold">{`${props.name}`}</p>
        </div>
        <div className="flex w-1/3 items-center justify-between">
          <p> {`Price: ${props.price}zł`}</p>
          <p> {`In magazine: ${props.quantity}`}</p>
        </div>
      </div>
      <div>
        <Button className="mx-4 bg-blue-400 p-6 hover:bg-blue-500">
          Edytuj
        </Button>
        <Button className="mx-4 bg-red-700 p-6 hover:bg-red-800">Usuń</Button>
      </div>
    </li>
  );
};

const ProductList = () => {
  return (
    <Card className="h-[80vh] max-h-[80vh] w-[85%] overflow-hidden ">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Products</h1>
      </CardHeader>
      <CardContent className=" my-6 max-h-[85%] overflow-hidden overflow-y-scroll">
        <ul className="flex flex-col ">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductListItem
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export default ProductList;
