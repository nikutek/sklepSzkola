import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export type addProductType = {
  name: string;
};

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
    control,
  } = useForm<addProductType>();

  const submitHandler = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Dodaj Kategorie</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-4">
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

          <div className="mt-8 flex items-center justify-center">
            <Button
              disabled={isSubmitting ? true : false}
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

export default AddCategoryForm;
