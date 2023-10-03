/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import bcrypt, { hash } from "bcrypt";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password }: { email: string; password: string } = req.body;

    // check czy wpisany jest email i hasło
    if (!email || !password) {
      res.status(400).json({ message: "Brak adresu email lub hasła" });
    }

    console.log(email);
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
      const hash = bcrypt.hashSync(password, saltRounds);
      const user = await db.user.create({
        data: { email, password: hash },
      });

      const verificationToken = user.id;
      const verificationUrl = `https://sklep-szkola.vercel.app/auth/verify?email=${email}&token=${verificationToken}`;

      const mailOptions = {
        from: "szklep@zsp1.siedlce.pl",
        to: email,
        subject: "!!!Gorące mamuśki w twojej okolicy!!!",
        text: verificationUrl,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ message: "Proszę zweryfikować email." });
        }
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
