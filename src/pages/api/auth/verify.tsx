/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;
  const { email, token }: { email: string; token: string } = req.body;
  if (req.method == "POST") {
    const user = db.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);
  }
}
