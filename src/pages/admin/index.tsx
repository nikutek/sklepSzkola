import React from "react";
import AdminMenu from "~/components/admin/adminMenu";
import ProductList from "~/components/admin/productList";

const ProductsPage = () => {
  return (
    <div className="flex h-screen min-h-[90vh] flex-col items-center justify-around bg-bg-grey md:h-[90vh] md:flex-row">
      <section className="flex h-[15%] w-[90%] items-center justify-center md:h-[90%] md:w-[20%]">
        <AdminMenu activeSite="/admin" />
      </section>
      <section className="flex max-h-[80vh] min-h-[60%] w-[75%] items-center justify-center">
        <ProductList />
      </section>
    </div>
  );
};
export default ProductsPage;
