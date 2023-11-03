import { Card, CardContent, CardHeader } from "components/ui/card";
import React from "react";

import { Button } from "components/ui/button";
import Link from "next/link";

const DUMMY_CATEGORIES = [
  {
    id: "k1",
    name: "Ubrania",
  },
  {
    id: "k2",
    name: "Buty",
  },
  {
    id: "k3",
    name: "Czapki",
  },
  {
    id: "k4",
    name: "Akcesoria",
  },
  {
    id: "k5",
    name: "XDFD",
  },
  {
    id: "k6",
    name: "Plyty",
  },
];
const CategoriesListItem = (props: { key: string; name: string }) => {
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
        <Button className=" bg-red-700 p-4 text-sm hover:bg-red-800 md:text-lg">
          Usuń
        </Button>
      </div>
    </li>
  );
};
const CategoriesList = () => {
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
        <ul className="flex flex-col ">
          {DUMMY_CATEGORIES.map((category) => (
            <CategoriesListItem key={category.id} name={category.name} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export default CategoriesList;
