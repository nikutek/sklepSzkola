/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  req.statusCode = 200;
  const { email, token }: { email: string; token: string } = req.body;
  if (req.method == "POST") {
    let user: {
      id: string;
      name: string | null;
      email: string | null;
      password: string;
      emailVerified: boolean;
      image: string | null;
    } | null = null;

    try {
      user = await db.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (err) {
      res.status(400).json({ message: "Błąd bazdy danych." });
      return;
    }

    if (!user) {
      res.status(400).json({ message: "Nie ma takiego użykownika." });
      return;
    }

    if (user.emailVerified) {
      res
        .status(400)
        .json({ message: "Ten użytkownik jest już zweryfikowany." });
      return;
    }

    if (token == user.id) {
      // POPRAWNA WERYFIKACJA
      await db.user.update({
        where: { email: email },
        data: { emailVerified: true },
      });
      res.status(200).json({ message: "Zweryfikowano użytkownika" });
    } else {
      res.status(400).json({ message: "Niepoprawny token" });
    }
  }
}
