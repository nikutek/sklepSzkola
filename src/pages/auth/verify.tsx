import React from "react";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "components/ui/card";

interface responseObject {
  message: string;
  verified: boolean;
}

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { email, token } = router.query;

  useEffect(() => {
    const verifyHandler = async () => {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });
      if (response.ok) {
        await router.push("/auth/signin");
      }
      const res = (await response.json()) as responseObject;
      setMessage(res.message);
      setIsLoading(false);
    };
    verifyHandler().catch(console.error);
  }, [email, token, router]);
  return (
    <div className=" flex h-[90vh] items-center justify-center bg-bg-grey">
      <Card className=" w-1/2">
        <CardHeader>
          <h1 className=" text-center text-2xl font-bold">
            Zweryfikuj swoje konto
          </h1>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-center text-lg">{`${
              isLoading ? "Trwa weryfikacja" : message
            }`}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
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
