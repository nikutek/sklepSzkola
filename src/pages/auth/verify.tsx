import React from "react";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { divider } from "@nextui-org/react";

interface responseObject {
  message: string;
}

const Verify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verWasSent, setVerWasSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { email, token } = router.query;

  useEffect(() => {
    const verifyHandler = async () => {
      setVerWasSent(true);
      setIsLoading(true);
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });
      if (response.ok) {
        setIsVerified(true);
      }
      const res = (await response.json()) as responseObject;
      setMessage(res.message);
      setIsLoading(false);
    };
    verifyHandler().catch(console.error);
  }, [email, token]);
  return (
    <div>
      <div>
        <h1>Verify your account</h1>
        {isVerified && (
          <div>
            <p>Zweryfikowano</p>
          </div>
        )}
        {verWasSent && !isVerified && !isLoading && (
          <div>
            <p>{`${message}`}</p>
          </div>
        )}
        {verWasSent && !isVerified && !isLoading && (
          <div>
            <p>Trwa weryfikacja</p>
          </div>
        )}
      </div>
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
