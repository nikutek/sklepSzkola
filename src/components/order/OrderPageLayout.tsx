import { Card } from "components/ui/card";

import { useShoppingCart } from "~/store/cartCtx";
import OrderItem from "./OrderItem";
import { Label } from "@radix-ui/react-label";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { useState } from "react";
import Product from "../shop/Product";
import { orderType } from "~/pages/api/orders";
import { useRouter } from "next/router";
import { useToast } from "components/ui/use-toast";

type FormData = {
  name: string;
  address: string;
  post: string;
  postal: string;
  delivery: string;
};

type UserType = {
  id: string;
  email?: string;
  name: string;
  address: string;
  post: string;
  postal: string;
};

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

const OrderPageLayout = (props: { user: UserType }) => {
  const { cartItems } = useShoppingCart();
  const { name, post, postal, address, email, id } = props.user;
  console.log(props.user);
  const router = useRouter();

  const { toast } = useToast();

  const [deliveryCost, setDeliveryCost] = useState(0);
  let price = deliveryCost;
  cartItems.forEach((item) => {
    price += item.quantity * item.product.price;
  });

  const products: Product[] = [];

  cartItems.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      products.push(item.product);
    }
  });
  console.log(products);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const submitHandler = async (data: FormData) => {
    const order = {
      user_id: id,
      products,
      address: data.address,
      post: data.post,
      postal: data.postal,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const convertedData = (await response.json()) as orderType;
    console.log(convertedData);
  };
  console.log(cartItems);
  if (cartItems.length == 0) {
    toast({
      title: "Brak dostępu",
      description: "Aby wejść na stronę zamówienia musisz mieć coś w koszyku",
      variant: "destructive",
    });
    void router.replace("/");
  }
  if (!email) {
    void router.replace("/");
    toast({
      title: "Brak dostępu",
      description: "Aby wejść na stronę zamówienia musisz być zalogowany",
      variant: "destructive",
    });
  }

  return (
    <Card className="w-[80%] p-5">
      <div className="flex items-center justify-between">
        <ul className="w-[50%] border-r-2 pr-10">
          {cartItems.map((item) => (
            <OrderItem
              key={item.product.product_id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
          <li>
            <h2 className="mt-5 text-center text-2xl font-bold">{`Razem: ${price}zł`}</h2>
          </li>
        </ul>
        <div className="flex w-[50%] items-center justify-center">
          <form className="w-[65%]" onSubmit={handleSubmit(submitHandler)}>
            {email && (
              <div className="mt-4">
                <Label htmlFor="name">{`Email: ${email}`}</Label>
              </div>
            )}
            <div className="mt-4">
              <Label htmlFor="name">Imie i Nazwisko</Label>
              <Input
                id="name"
                defaultValue={name}
                {...register("name", {
                  required: "Imie i nazwisko jest wymagane",
                })}
              />
              {errors.name && (
                <p className="sm:text-md text-red-600">{`${errors.name.message}`}</p>
              )}
            </div>

            <div className="mt-4">
              <Label htmlFor="post">Poczta</Label>
              <Input
                defaultValue={post}
                id="post"
                {...register("post", {
                  required: "Poczta jest wymagana",
                })}
              />
              {errors.post && (
                <p className="sm:text-md text-red-600">{`${errors.post.message}`}</p>
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="postal">Kod pocztowy</Label>
              <Input
                id="postal"
                defaultValue={postal}
                {...register("postal", {
                  required: "Kod pocztowy jest wymagany",
                  pattern: {
                    value: /\d{2}-\d{3}/,
                    message:
                      "Błędny kod pocztowy. Kod pocztowy musi mieć format xx-xxx",
                  },
                })}
              />
              {errors.postal && (
                <p className="sm:text-md text-red-600">{`${errors.postal.message}`}</p>
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="address">Adres Zamieszkania</Label>
              <Input
                id="address"
                defaultValue={address}
                {...register("address", {
                  required: "Adres zamieszkania jest wymagany",
                })}
              />
              {errors.address && (
                <p className="sm:text-md text-red-600">{`${errors.address.message}`}</p>
              )}
            </div>
            <Controller
              name="delivery"
              control={control}
              rules={{
                required: "Rodzaj dostawy jest wymagany",
              }}
              render={({ field }) => (
                <div className="mt-4">
                  <RadioGroup
                    defaultValue={field.value}
                    onChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="14.99"
                        id="DPD"
                        onClick={() => {
                          setDeliveryCost(14.99);
                        }}
                      />
                      <Label htmlFor="DPD">Kurier DPD 14.99zł</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="13.99"
                        id="inpostKurier"
                        onClick={() => {
                          setDeliveryCost(13.99);
                        }}
                      />

                      <Label htmlFor="inpostKurier">Kurier Inpost 13.99</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="8.99"
                        onClick={() => {
                          setDeliveryCost(8.99);
                        }}
                        id="inpostPaczkomaty"
                      />
                      <Label htmlFor="inpostPaczkomaty">
                        Paczkomaty Inpost 8.99
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.delivery && (
                    <p className="sm:text-md text-red-600">{`${errors.delivery.message}`}</p>
                  )}
                </div>
              )}
            />

            <div className="mt-8 flex items-center justify-center">
              <Button
                disabled={isSubmitting ? true : false}
                className="bg-blue-500 px-8 py-5 hover:bg-blue-700"
                type="submit"
              >
                Zamów
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};
export default OrderPageLayout;
