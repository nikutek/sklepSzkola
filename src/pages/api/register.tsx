/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import bcrypt, { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password }: { email: string; password: string } = req.body;

    // check czy wpisany jest email i hasło
    if (!email || !password) {
      res.status(400).json({ message: "Brak adresu email lub hasła" });
      return;
    }

    // sprawdzenie czy email jest poprawny
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.toLowerCase())) {
      res.status(400).json({ message: "Niepoprawny email" });
      return;
    }

    // sprawdzenie czy hasło jest wystarczająco silne
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: "Zbyt słabe hasło" });
      return;
    }

    // sprzwdzenie czy nie istnieje już taki użytkownik
    try {
      const exist = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      if (exist) {
        res.status(400).json({ message: "Taki użytkownik już istnieje" });
        return;
      }

      // DODAWANIE UŻYTKOWNIKA DO BAZY
      const saltRounds = 10;
      bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
          console.log(hash);
        })
        .catch((err) => {
          res.status(400).json({
            message:
              "Wystąpił błąd podczas tworzenia użytkownika, przepraszamy",
          });
          console.log(err);
        });

      res.status(200).json({ message: "Pomyślnie dodano użytkownika" });
      return;
    } catch {
      res.status(400).json({ message: "Problem z bazą danych..." });
      return;
    }
  } else {
    // Handle any other HTTP method
  }
}
