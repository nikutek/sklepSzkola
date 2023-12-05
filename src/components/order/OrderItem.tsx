import Image from "next/image";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  images: { product_id: number; source: string; image_id: number }[];
  isDigital: boolean;
  quantity: number;
  categories: { id: number; name: string }[];
};

const OrderItem = (props: { product: Product; quantity: number }) => {
  const { mainImage, price, name } = props.product;
  return (
    <li className="mb-2 flex items-center justify-between border-b-2 p-2">
      <Image width={100} height={100} alt="Thumbnail" src={mainImage} />
      <h3 className="text-xl font-bold">{name}</h3>
      <h4 className="text-xl ">{`${price}zł`}</h4>
      <p className="text-lg">{`Ilość: ${props.quantity}`}</p>
    </li>
  );
};

export default OrderItem;
