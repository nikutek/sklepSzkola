/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";
import { type productType } from "../products";

interface orderType {
  order_id: number;
  user: string;
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
    // konkretne zamówienie
    const order_id: number = parseInt(req.query.id as string);
    if (order_id) {
      console.log("one");
      if (isNaN(order_id)) {
        res.status(200).json("nieprawidłowe ID");
        return;
      }
      const order = await db.order.findUnique({
        where: { order_id },
        include: { products: true },
      });
      res.status(200).json(order);
      return;
    }
  }

  if (req.method === "PATCH") {
    const { order_id, user_id, shipped_date, address, postal, post, products } =
      req.body as orderType;
    if (user_id && products) {
      const order = await db.order.update({
        where: { order_id },
        data: {
          shipped_date: shipped_date ?? undefined,
          address: address ?? undefined,
          postal: postal ?? undefined,
          post: post ?? undefined,
          user:
            {
              connect: { id: user_id },
            } ?? undefined,
          products:
            {
              connect: products.map((product) => ({
                product_id: product.product_id ?? undefined,
              })),
            } ?? undefined,
        },
        include: { user: true, products: true },
      });
      res.status(200).json(order);
      return;
    } else if (user_id) {
      const order = await db.order.update({
        where: { order_id },
        data: {
          shipped_date: shipped_date ?? undefined,
          address: address ?? undefined,
          postal: postal ?? undefined,
          post: post ?? undefined,
          user:
            {
              connect: { id: user_id },
            } ?? undefined,
        },
        include: { user: true, products: true },
      });
      res.status(200).json(order);
      return;
    } else if (products) {
      const order = await db.order.update({
        where: { order_id },
        data: {
          shipped_date: shipped_date ?? undefined,
          address: address ?? undefined,
          postal: postal ?? undefined,
          post: post ?? undefined,
          products:
            {
              connect: products.map((product) => ({
                product_id: product.product_id ?? undefined,
              })),
            } ?? undefined,
        },
        include: { user: true, products: true },
      });
      res.status(200).json(order);
      return;
    }
  }

  if (req.method === "DELETE") {
    const { order_id } = req.body as orderType;
    const order = await db.order.delete({
      where: {
        order_id,
      },
    });

    res.status(200).json(order);
    return;
  }
}
