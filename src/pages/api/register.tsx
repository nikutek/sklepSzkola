import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Brak adresu email lub hasła" });
      return;
    }

    const exist = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(exist);
    if (exist) {
      res.status(400).json({ message: "Taki użytkownik już istnieje" });
      return;
    }

    const user = await db.user.create({ data: { email, password } });
    console.log(user, "user");

    res.status(200).json({ message: "User zrobiony" });
  } else {
    // Handle any other HTTP method
  }
}
