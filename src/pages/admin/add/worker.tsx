import React from "react";
import AddWorkerForm from "~/components/admin/add/addWorker";

const Worker = () => {
  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-bg-grey p-5 md:min-h-[90vh]">
      <AddWorkerForm />
    </section>
  );
};
export default Worker;
