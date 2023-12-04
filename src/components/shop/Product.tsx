import { Card } from "components/ui/card";
import { Slider } from "./UI/Slider";
import { Button } from "components/ui/button";
import { useShoppingCart } from "~/store/cartCtx";
export type ProductData = {
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

const Product = (props: { product: ProductData }) => {
  const { name, description, price, mainImage, images, quantity } =
    props.product;
  const { increaseCartQuantity } = useShoppingCart();

  const imagesSrc = images.map((image) => image.source);
  imagesSrc.unshift(mainImage);

  return (
    <Card className="mt-5 w-[55vw] p-5">
      <section className="flex items-center justify-between">
        <div className="flex w-1/2 items-center justify-center">
          <Slider imagesSrc={imagesSrc} />
        </div>
        <div className="w-1/3">
          <h2 className="mb-2 text-3xl font-bold">{name}</h2>
          <p className="mb-6 text-xl">{`Cena: ${price}zł`}</p>
          <p>{`Na magazynie: ${quantity}`}</p>

          <Button
            onClick={() => {
              increaseCartQuantity(props.product);
            }}
            type="submit"
            className="mt-2"
          >
            Dodaj do koszyka
          </Button>
        </div>
      </section>
      <section className="mt-20 text-center">
        <p className="text-lg">{description}</p>
      </section>
    </Card>
  );
};

export default Product;
