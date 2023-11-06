import React from "react";
import AddProductForm from "~/components/admin/add/addProductForm";

const Product = () => {
  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-bg-grey p-5 md:min-h-[90vh]">
      <AddProductForm />
    </section>
  );
};
export default Product;
