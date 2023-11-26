import React, { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Textarea } from "components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useToast } from "components/ui/use-toast";
import type { categoryType } from "~/pages/api/categories";
import { MultiSelect } from "components/ui/mulitselect";

export type addProductType = {
  name: string;
  description: string;
  frontImage: File;
  images: File[];
  price: number;
  quantity: number;
  isDigital: string;
  categoriesId: string[];
};
interface FileToBase64Result {
  base64Data: string;
  fileInfo: {
    name: string;
    type: string;
    size: number;
  };
}

const fileToBase64 = (file: File): Promise<FileToBase64Result> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const base64Data = event.target.result as string;
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
        };

        resolve({ base64Data, fileInfo });
      } else {
        reject(new Error("Error reading file as base64."));
      }
    };

    reader.readAsDataURL(file);
  });
};

const AddProductForm = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<addProductType>();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = (await response.json()) as categoryType[];
      setCategories(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchCategories().catch((err) => {
      console.log(err);
    });
  }, []);

  const { toast } = useToast();

  const submitHandler = async (data: FieldValues) => {
    const frontImgFiles: FileList = data.frontImage as FileList;
    const imagesFiles: FileList = data.images as FileList;
    const imagesFilesArr = Array.from(imagesFiles);
    console.log(data);
    if (frontImgFiles.length === 0 || imagesFilesArr.length === 0) {
      return;
    }
    const file = frontImgFiles[0]!;
    const { base64Data } = await fileToBase64(file);
    const mainImage = base64Data.split(",").pop();

    const baseFiles = [];

    for (const file of imagesFilesArr) {
      try {
        const { base64Data } = await fileToBase64(file);
        const baseFile = base64Data.split(",").pop();
        baseFiles.push(baseFile);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
    const isDigital = data.isDigital === "true" ? true : false;
    const product = {
      name: data.name as string,
      price: data.price as number,
      quantity: data.quantity as number,
      description: data.description as string,
      isDigital,
      imagesBase64: baseFiles,
      mainImage,
    };
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
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
      description: "Pomyślnie dodano produkt",
    });
  };
  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Dodaj Produkt</h1>
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
              <div className="mt-4">
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

          <div className="mt-4">
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
          <div className="mt-4">
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
          <div className="mt-4">
            <Label htmlFor="images">Pozostałe zdjęcia</Label>
            <Input id="images" multiple type="file" {...register("images")} />
            {errors.images && (
              <p className="sm:text-md text-red-600">{`${errors.images.message}`}</p>
            )}
          </div>
          <div className="mt-4">
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
          <Controller
            name="isDigital"
            control={control}
            rules={{ required: "Pole nie może być puste" }}
            render={({ field }) => (
              <div className="mt-4">
                <Label>Czy produkt jest cyfrowy</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Czy produkt jest cyfrowy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Tak</SelectItem>
                    <SelectItem value="false">Nie</SelectItem>
                  </SelectContent>
                </Select>
                {errors.isDigital && (
                  <p className="sm:text-md text-red-600">{`${errors.isDigital.message}`}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="categoriesId"
            control={control}
            rules={{ required: "Pole nie może być puste" }}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4">
                <Label>Wybierz kategorie</Label>
                <MultiSelect
                  selected={field.value}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.category_id + "",
                  }))}
                  {...field}
                />
                {errors.categoriesId && (
                  <p className="sm:text-md text-red-600">{`${errors.categoriesId.message}`}</p>
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
              Dodaj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
