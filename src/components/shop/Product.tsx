import { Card } from "components/ui/card";
import { Slider } from "./UI/Slider";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm } from "react-hook-form";
export type ProductData = {
  id: number;
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
  const { id, name, description, price, mainImage, images, quantity } =
    props.product;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ quantity: number }>();

  const imagesSrc = images.map((image) => image.source);
  imagesSrc.unshift(mainImage);

  const submitHandler = (data: { quantity: number }) => {
    const { quantity } = data;
  };

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
          <form onSubmit={handleSubmit(submitHandler)} className="mt-5">
            <div className="flex items-center">
              <Label className="m-2 text-lg">Ilość</Label>
              <Input
                {...register("quantity", {
                  required: "Ilośc jest wymagana",
                  min: { value: 1, message: "Ilość musi być większa od zera" },
                })}
              />
              {errors.quantity && (
                <p className="sm:text-md text-red-600">{`${errors.quantity.message}`}</p>
              )}
            </div>

            <Button type="submit" className="mt-2">
              Dodaj do koszyka
            </Button>
          </form>
        </div>
      </section>
      <section className="mt-20 text-center">
        <p className="text-lg">{description}</p>
      </section>
    </Card>
  );
};

export default Product;
