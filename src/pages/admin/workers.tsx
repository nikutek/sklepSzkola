import React from "react";
import AdminMenu from "~/components/admin/adminMenu";
import WorkersList from "~/components/admin/workersList";

const WorkersPage = () => {
  return (
    <div className="flex h-screen min-h-[90vh] w-full flex-col items-center justify-around bg-bg-grey md:h-[90vh] md:flex-row">
      <section className="flex h-[15%] w-[90%] items-center justify-center md:h-[90%] md:w-[23%]">
        <AdminMenu activeSite="/workers" />
      </section>
      <section className="flex max-h-[80vh] min-h-[60%] w-[95%] items-center justify-center md:w-[75%]">
        <WorkersList />
      </section>
    </div>
  );
};
export default WorkersPage;
