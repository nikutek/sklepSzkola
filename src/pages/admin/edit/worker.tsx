import React from "react";
import EditWorkerForm from "~/components/admin/edit/editWorker";

type workerValues = {
  id: string;
  name: string;
  email: string;
  address: string;
  post: string;
  postal: string;
  password: string;
};

const Worker = (props: workerValues) => {
  const worker = {
    id: props.id,
    name: props.name,
    address: props.address,
    post: props.post,
    postal: props.postal,
    password: props.password,
    isWorker: "true",
  };
  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-bg-grey p-5 md:min-h-[90vh]">
      <EditWorkerForm worker={worker} email={props.email} />
    </section>
  );
};
export default Worker;

export const getServerSideProps = (context: { query: workerValues }) => {
  return {
    props: {
      id: context.query.id,
      name: context.query.name,
      email: context.query.email,
      address: context.query.address,
      post: context.query.post,
      postal: context.query.postal,
      password: context.query.password,
    },
  };
};
