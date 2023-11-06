import { Card, CardContent, CardHeader } from "components/ui/card";
import React, { useEffect, useState } from "react";
import type { categoryType } from "~/pages/api/categories";
import { Button } from "components/ui/button";
import Link from "next/link";
import { useToast } from "components/ui/use-toast";

const CategoriesListItem = (props: {
  key: number;
  name: string;
  id: number;
  onDelete: (category: categoryType) => void;
}) => {
  const category = {
    category_id: props.id,
    name: props.name,
  };

  return (
    <li className="border-grey my-3 flex w-full flex-wrap  items-center justify-between border-b-2 py-2 text-sm md:flex-nowrap md:p-2 md:text-lg">
      <div className="flex w-full  items-center justify-around md:w-[70%] ">
        <div className="flex items-center">
          <p className="font-bold">{`${props.name}`}</p>
        </div>
      </div>
      <div className=" my-2 flex w-full justify-around md:w-1/4">
        <Button className=" bg-blue-400 p-4 text-sm hover:bg-blue-500 md:text-lg">
          Edytuj
        </Button>
        <Button
          onClick={props.onDelete.bind(null, category)}
          className=" bg-red-700 p-4 text-sm hover:bg-red-800 md:text-lg"
        >
          Usuń
        </Button>
      </div>
    </li>
  );
};
const CategoriesList = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = (await response.json()) as categoryType[];
      setCategories(data);
      setIsLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    fetchCategories().catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteCategoryHandler = async (category: categoryType) => {
    console.log("es");
    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Coś poszło nie tak",
      });
      return;
    }

    await fetchCategories();
    toast({
      title: "Sukces",
      description: "Pomyślnie usunięto",
    });
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] w-full overflow-hidden md:w-[70%] ">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Kategorie</h1>
        <div className="">
          <Button className=" px-6 py-6 hover:bg-orange-500">
            <Link href={"/admin/add/category"}>Dodaj Kategorie</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="my-2 max-h-[85%] w-[full] overflow-hidden overflow-y-scroll p-2 md:my-6">
        {!isLoading && (
          <ul className="flex flex-col ">
            {categories.map((category: categoryType) => (
              <CategoriesListItem
                onDelete={deleteCategoryHandler}
                id={category.category_id}
                key={category.category_id}
                name={category.name}
              />
            ))}
          </ul>
        )}

        {isLoading && <p className=" text-center text-xl">Loading...</p>}
      </CardContent>
    </Card>
  );
};
export default CategoriesList;
