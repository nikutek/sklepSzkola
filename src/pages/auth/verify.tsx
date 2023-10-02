import React from "react";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
const Verify = () => {
  return <div>verify</div>;
};

export default Verify;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const res = context.res as NextApiResponse;
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
