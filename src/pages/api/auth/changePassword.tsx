import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

interface changePasswordData {
  email: string;
  token?: string;
  newPassword?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, token, newPassword } = req.body as changePasswordData;

  if (req.method == "POST") {
    console.log(email, token, newPassword);

    if (!email) {
      res.status(400).json({ message: "Brak adresu email.", isError: true });
      return;
    }

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (!user) {
      res
        .status(400)
        .json({ message: "Nie ma takiego użytkownika.", isError: true });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const passwordChangeUrl = `https://sklep-szkola.vercel.app/auth/changePassword/?email=${email}&token=${user.id}`;

    const mailOptions = {
      from: "szklep@zsp1.siedlce.pl",
      to: email,
      subject: "!!!Gorące mamuśki w twojej okolicy!!!",
      text: passwordChangeUrl,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "Mail do zmiany hasła został wysłany.",
      isError: false,
    });
    return;
  }

  if (req.method == "PUT") {
    console.log(email, token, newPassword);
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
      res.status(400).json({ message: "Błąd bazdy danych.", isError: true });
      return;
    }

    if (!user) {
      res
        .status(400)
        .json({ message: "Nie ma takiego użykownika.", isError: true });
      return;
    }

    if (!newPassword) {
      res.status(400).json({ message: "Brakuje hasła.", isError: true });
      return;
    }

    if (user.id != token) {
      res
        .status(400)
        .json({ message: "Niepoprawny token weryfikacyjny", isError: true });
      return;
    }

    if (user.password == newPassword) {
      res
        .status(400)
        .json({ message: "Hasło musi być inne niż wcześniej.", isError: true });
      return;
    }

    const saltRounds = 10;
    const hash = bcryptjs.hashSync(newPassword, saltRounds);
    console.log(hash);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedUser = await db.user.update({
      where: { id: token },
      data: { password: hash },
    });
    res
      .status(200)
      .json({ message: "Pomyślnie zmieniono hasło.", isError: false });
  }
}
