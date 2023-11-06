import React from "react";
import EditCategoryForm from "~/components/admin/edit/editCategoryForm";

type categoryValues = {
  name: string;
  id: number;
};

const Category = (props: categoryValues) => {
  const category = {
    name: props.name,
    id: props.id,
  };
  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-bg-grey p-5 md:min-h-[90vh]">
      <EditCategoryForm category={category} />
    </section>
  );
};
export default Category;

export const getServerSideProps = (context: { query: categoryValues }) => {
  console.log(context.query);
  return {
    props: {
      name: context.query.name,
      id: context.query.id,
    },
  };
};
