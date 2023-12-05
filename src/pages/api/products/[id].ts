import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    if (!req.query.id || Array.isArray(req.query.id)) {
      return res.status(400).json("Nieprawidłowe ID");
    }
    const id: number = parseInt(req.query.id);

    const product = await db.product.findUnique({
      where: { product_id: id },
      include: { images: true, categories: true },
    });
    return res.status(200).json(product);
  }
}
