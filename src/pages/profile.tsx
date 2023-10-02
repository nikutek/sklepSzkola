import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import React from "react";

const Profile = () => {
  return <div>profile</div>;
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const res = context.res as NextApiResponse;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
