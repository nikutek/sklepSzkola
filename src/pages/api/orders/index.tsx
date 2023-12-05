/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";
import { type productType } from "../products";
import type { userType } from "~/components/admin/ordersList";

export interface orderType {
  order_id: number;
  user: userType;
  user_id: string;
  order_date: Date;
  shipped_date: Date | null;
  address: string;
  postal: string;
  post: string;
  products: productType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const orders = await db.order.findMany({
      include: { products: true, user: true },
    });
    res.status(200).json(orders);
    return;
  }
  if (req.method === "POST") {
    const {
      user_id,
      shipped_date = null,
      address,
      postal,
      post,
      products,
    } = req.body as orderType;
    const order = await db.order.create({
      data: {
        order_date: new Date(),
        shipped_date: null,
        address,
        postal,
        post,
        user: {
          connect: { id: user_id },
        },
        products: {
          connect: products.map((product) => ({
            product_id: product.product_id,
          })),
        },
      },
    });
    res.status(200).json(order);
    return;
  }
}
