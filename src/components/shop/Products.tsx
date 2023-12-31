import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Card } from "components/ui/card";
import { type categoryType } from "~/pages/api/categories";
import { ProductData } from "./Product";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  console.log(selectedCategory);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = (await response.json()) as ProductData[];
      setProducts(data);
    } catch (err) {}
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = (await response.json()) as categoryType[];
      setCategories(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts().catch((err) => {
      console.log(err);
    });
    fetchCategories().catch((err) => {
      console.log(err);
    });
  }, []);

  const selectCategoryHandler = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <>
      <Card className="mt-5 flex w-[80%] flex-col items-center justify-center bg-black p-5">
        <h1 className=" text-center text-3xl font-bold text-white">Produkty</h1>
        <div className="flex flex-row ">
          <p className="pr-2 text-xl text-white">Kategoria: </p>
          <select
            name="categories"
            className="mt-2"
            onChange={(e) => {
              selectCategoryHandler(parseInt(e.target.value));
            }}
            defaultValue={0}
          >
            <option value={0}>Wszystkie</option>
            {categories.map((category) => {
              return (
                <option value={category.category_id} key={category.category_id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </Card>
      <div className="flex h-[90vh] w-[80%] flex-wrap justify-around">
        {products
          .filter((product) => {
            console.log(product.categories);
            if (selectedCategory == undefined || selectedCategory == 0)
              return true;
            for (const i of product.categories) {
              if (i.category_id == selectedCategory) {
                return true;
              }
            }
          })
          .map((product) => (
            <ProductItem key={product.product_id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Products;
