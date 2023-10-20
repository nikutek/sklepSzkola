import React from "react";
import AdminMenu from "~/components/admin/adminMenu";

const OrdersPage = () => {
  return (
    <div className="flex h-[90vh] min-h-[90vh] items-center justify-around bg-bg-grey">
      <section className="flex h-[90%] w-[20%] items-center justify-center">
        <AdminMenu activeSite="/orders" />
      </section>
      <section className="min-h-[90%] w-[75%] bg-black"></section>
    </div>
  );
};
export default OrdersPage;
