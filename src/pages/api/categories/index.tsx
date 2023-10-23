/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";

interface categoryType {
  category_id: number;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const categories = await db.category.findMany();
    res.status(200).json(categories);
    return;
  }
  if (req.method === "POST") {
    const { name } = req.body as categoryType;
    const category = await db.category.create({
      data: {
        name,
      },
    });
    res.status(200).json(category);
    return;
  }

  if (req.method === "PATCH") {
    const { category_id, name } = req.body as categoryType;
    const category = await db.category.update({
      where: {
        category_id,
      },
      data: {
        name,
      },
    });

    res.status(200).json(category);
    return;
  }

  if (req.method === "DELETE") {
    const { category_id } = req.body as categoryType;
    const category = await db.category.delete({
      where: {
        category_id,
      },
    });

    res.status(200).json(category);
    return;
  }
}
