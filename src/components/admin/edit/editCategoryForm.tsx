import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useToast } from "components/ui/use-toast";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
export type editCategoryType = {
  id: number;
  name: string;
};

const EditCategoryForm = (props: { category: editCategoryType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editCategoryType>();

  const { toast } = useToast();
  const router = useRouter();
  const { name, id } = props.category;

  const submitHandler = async (data: FieldValues) => {
    if (name === data.name) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nic nie zmieniono.Aby edytować zmień wartość",
      });
      return;
    }

    const category = { category_id: Number(id), name: data.name as string };
    console.log(category);

    const response = await fetch("/api/categories", {
      method: "PATCH",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Coś poszło nie tak",
      });
      return;
    }

    toast({
      title: "Sukces",
      description: "Pomyślnie edytowano kategorie",
    });
    await router.replace("/admin/categories");
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Edytuj Kategorie</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-4">
            <Label htmlFor="name">Nazwa</Label>
            <Input
              defaultValue={name}
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
              Edytuj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCategoryForm;
