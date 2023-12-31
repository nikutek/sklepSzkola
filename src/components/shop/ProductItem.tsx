import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Label } from "components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "~/store/cartCtx";
import type { ProductData } from "./Product";

const ProductItem = (props: { product: ProductData }) => {
  const { name, price, mainImage, product_id } = props.product;
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <Card className="relative m-2 flex h-[40%]  w-1/6 flex-col items-center  p-2 ">
      <div className="flex h-[90%] w-[80%] flex-col items-center justify-around">
        <div className="relative h-[50%] w-full rounded-lg">
          <Image
            className="rounded-lg"
            fill={true}
            src={mainImage}
            alt={"product img"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between p-2">
          <Link
            href={{
              pathname: "/product",
              query: { id: product_id },
            }}
          >
            <Label className="cursor-pointer p-2 text-center text-lg hover:underline">{`${name}`}</Label>
          </Link>

          <Label>{`${price} zł`}</Label>
        </div>
        <div>
          <Button
            onClick={() => {
              increaseCartQuantity(props.product);
            }}
          >
            Dodaj do Koszyka
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
