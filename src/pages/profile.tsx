import { getServerSession } from "next-auth";
import type {
  GetServerSideProps,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from "next";
import { authOptions } from "~/server/auth";
import React from "react";
import { type productType } from "~/components/admin/productList";
import { type orderType } from "./api/orders";
import { useState } from "react";
import Image from "next/image";

interface UserDataType {
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
  favoriteProducts: {
    id: number;
    product_id: number;
    user_id: string;
    product: productType;
  }[];
}

const Profile: NextPage<{ userDataProps: UserDataType }> = ({
  userDataProps,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<UserDataType>(userDataProps);

  return (
    <div className=" flex h-full  min-h-screen flex-col">
      <section className="w-full bg-white">
        <div className="justify-[1/3] flex flex-row items-center border-b-4 border-black pl-24 shadow-lg">
          <Image
            src={
              userData.image
                ? userData.image
                : "https://cdn-icons-png.flaticon.com/512/16/16467.png"
            }
            width={200}
            height={200}
            alt="Profile image"
            className=" mx-10 my-8 aspect-auto w-32"
          />

          <h1 className=" text-4xl font-bold tracking-wide">{userData.name}</h1>
        </div>

        <div className="justify-[1/3] flex flex-col gap-10 p-8 pl-24 shadow-lg">
          {userData.orders && (
            <div>
              <h2 className="m-4 text-2xl tracking-wide">
                <span className="border-b-2 border-black pr-4">
                  Twoje zamówienia w toku:
                </span>
              </h2>
              {userData.orders.map((order, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 border-b-4 px-8 py-2"
                  >
                    <p>zamówienie nr: {order.order_id}</p>
                    <p>
                      Adres: {`${order.post} ${order.postal}, ${order.address}`}
                    </p>

                    {order.products.map((product) => {
                      return (
                        <div
                          className="flex flex-row items-center gap-4"
                          key={product.product_id}
                        >
                          <Image
                            src={product.mainImage}
                            alt="zdjęcie produktu"
                            width={100}
                            height={100}
                          />
                          <h2 className="  flex-grow px-4 text-center text-xl tracking-wide">
                            {product.name}
                          </h2>
                          <p className="text-md  bg-red-300 px-4 text-center tracking-wide">
                            {product.price} zł
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <h2 className="m- text-2xl tracking-wide">
              <span className="border-b-2 border-black pr-4">
                Twoje Ulubione produkty:
              </span>
            </h2>
            {userData.favoriteProducts ? (
              <div className="flex w-full items-center justify-center">
                {userData.favoriteProducts.map((favoriteItem) => {
                  const product = favoriteItem.product;
                  return (
                    <div
                      key={product.product_id}
                      className=" m-4 flex w-1/6 flex-col items-center overflow-hidden rounded-xl border-2 border-black shadow-lg"
                    >
                      <a href={`/${product.product_id}`}>
                        <Image
                          src={product.mainImage}
                          alt="zdjęcie produktu"
                          width={300}
                          height={300}
                          className="w-full"
                        />

                        <h2 className="p-2 text-center text-xl">
                          {product.name}
                        </h2>
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Dodaj produkty</p>
            )}
          </div>
        </div>
      </section>
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

  const userEndpointResponse = await fetch(
    `http://localhost:3000/api/user/${session.user.email}`,
    {
      method: "GET",
    },
  );

  const userData = (await userEndpointResponse.json()) as UserDataType;

  return {
    props: {
      session,
      userDataProps: userData,
    },
  };
};
