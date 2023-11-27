import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const email = req.query.email;

    if (!email) {
      res.status(400).json("Brak email");
      return;
    }

    if (typeof email != "string") {
      res.status(400).json("Nieprawidłowy email");
      return;
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            products: { include: { images: true } },
          },
        },
        favoriteProducts: { include: { product: true } },
      },
    });

    if (!user) {
      res.status(400).json("Nie ma użytkownika z takim adresem email");
      return;
    }

    res.send(user);
    return;
  }
}
