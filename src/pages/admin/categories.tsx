import React from "react";
import AdminMenu from "~/components/admin/adminMenu";

const CategoriesPage = () => {
  return (
    <div className="flex h-[90vh] min-h-[90vh] items-center justify-around bg-bg-grey">
      <section className="flex h-[90%] w-[20%] items-center justify-center">
        <AdminMenu activeSite="/categories" />
      </section>
      <section className="min-h-[90%] w-[75%] bg-black"></section>
    </div>
  );
};
export default CategoriesPage;
