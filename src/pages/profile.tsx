import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import React from "react";
import { type productType } from "~/components/admin/productList";
import { type orderType } from "./api/orders";
import { useEffect, useState } from "react";
import Product from "./admin/add/product";

const Profile = (props) => {
  const [userData, setUserData] = useState<productType>(props.userData);
  console.log(userData);

  return (
    <div className="bg-black-600 w-full w-full">
      <div>profile {userData.name}</div>
    </div>
  );
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

  interface userDataType {
    id: string;
    name: string;
    address: string;
    postal: string;
    post: string;
    email: string;
    password: string;
    emailVerified: true;
    verificationToken: string;
    image: string | null;
    isWorker: boolean;
    isAdmin: boolean;
    orders: orderType[];
    favoriteProducts: productType[];
  }

  const userEndpointResponse = await fetch(
    `http://localhost:3000/api/user/${session.user.email}`,
    {
      method: "GET",
    },
  );

  const userData = (await userEndpointResponse.json()) as userDataType;

  return {
    props: {
      session,
      userData,
    },
  };
};
