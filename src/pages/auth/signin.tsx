import * as React from "react";
import Login from "~/components/login";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
export default function signin() {
  return <Login />;
}
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
