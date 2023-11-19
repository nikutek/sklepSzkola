import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";

export interface userType {
  id: string;
  name: string | null;
  address: string | null;
  postal: string | null;
  post: string | null;
  email: string | null;
  password: string;
  emailVerified: boolean;
  verificationToken: string;
  image: string | null;
  isWorker: boolean;
  isAdmin: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { email } = req.body as {
      email: string;
    };
    if (!email) {
      res.status(400).json("Brak email");
      return;
    }
    const user = await db.user.findUnique({ where: { email } });
    res.send(user);
    return;
  }
  if (req.method === "PATCH") {
    const {
      id,
      name,
      address,
      postal,
      post,
      email,
      password,
      emailVerified,
      image,
      isWorker,
      isAdmin,
    } = req.body as userType;
    const user = await db.user.update({
      where: { id },
      data: {
        id,
        name,
        address,
        postal,
        post,
        email,
        password,
        emailVerified,
        image,
        isWorker,
        isAdmin,
      },
    });

    res.status(200).json(user);
    return;
  }

  if (req.method == "DELETE") {
    const { id } = req.body as userType;
    const user = await db.user.delete({ where: { id } });
    res.status(200).json(user);
    return;
  }
}
