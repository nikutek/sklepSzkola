import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Textarea } from "components/ui/textarea";

type FormValues = {
  name: string;
  description: string;
  frontImage: File;
  images: File[];
  price: number;
  quantity: number;
};

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
    control,
  } = useForm<FormValues>();

  const submitHandler = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Dodaj Produkt</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <Label htmlFor="name">Nazwa</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Nazwa jest wymagana",
                maxLength: { value: 100, message: "Zbyt długa nazwa" },
              })}
            />
            {errors.name && (
              <p className="sm:text-md text-red-600">{`${errors.name.message}`}</p>
            )}
          </div>

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Pole opisu jest wymagane",
              minLength: {
                value: 50,
                message: "Opis musi zawierać co najmniej 50 znaków",
              },
            }}
            render={({ field }) => (
              <div>
                <Label className="my-2 block" htmlFor="description">
                  Opis
                </Label>
                <Textarea rows={4} {...field} />
                {errors.description && (
                  <p className="sm:text-md text-red-600">{`${errors.description.message}`}</p>
                )}
              </div>
            )}
          />

          <div>
            <Label htmlFor="price">Cena</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", {
                required: "Cena jest wymagana",
                valueAsNumber: true,
                min: { value: 0.01, message: "Cena musi być wyższa niż 0" },
              })}
            />
            {errors.price && (
              <p className="sm:text-md text-red-600">{`${errors.price.message}`}</p>
            )}
          </div>
          <div>
            <Label htmlFor="frontImage">Zdjęcie główne</Label>
            <Input
              id="frontImage"
              multiple
              type="file"
              {...register("frontImage", {
                required: "Zdjęcie główne jest wymagane",
              })}
            />
            {errors.frontImage && (
              <p className="sm:text-md text-red-600">{`${errors.frontImage.message}`}</p>
            )}
          </div>
          <div>
            <Label htmlFor="images">Pozostałe zdjęcia</Label>
            <Input id="images" multiple type="file" {...register("images")} />
            {errors.images && (
              <p className="sm:text-md text-red-600">{`${errors.images.message}`}</p>
            )}
          </div>
          <div>
            <Label htmlFor="quantity">Ilość</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", {
                required: "Ilość jest wymagana",
                valueAsNumber: true,
                min: { value: 0, message: "Ilość nie może być ujemna" },
              })}
            />
            {errors.quantity && (
              <p className="sm:text-md text-red-600">{`${errors.quantity.message}`}</p>
            )}
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Button
              className="bg-blue-500 px-8 py-5 hover:bg-blue-700"
              type="submit"
            >
              Dodaj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
