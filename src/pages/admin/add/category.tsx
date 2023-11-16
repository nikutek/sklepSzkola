import React from "react";
import AddCategoryForm from "~/components/admin/add/addCategoryForm";

const Category = () => {
  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-bg-grey p-5 md:min-h-[90vh]">
      <AddCategoryForm />
    </section>
  );
};
export default Category;
