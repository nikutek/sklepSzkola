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
        name: name ?? undefined,
        address: address ?? undefined,
        postal: postal ?? undefined,
        post: post ?? undefined,
        email: email ?? undefined,
        password: password ?? undefined,
        emailVerified: emailVerified ?? undefined,
        image: image ?? undefined,
        isWorker: isWorker ?? undefined,
        isAdmin: isAdmin ?? undefined,
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
