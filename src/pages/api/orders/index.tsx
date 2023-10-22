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
  products: productType[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET") { 
        // konkretne zamówienie
        const {order_id} = req.body as orderType;
        if (order_id) {
          const order = await db.order.findUnique({where:{order_id}});
          res.status(200).json(order);
          return;
        } else {
          const order = await db.order.findMany();
          res.status(200).json(order);
          return;
        }
        
        
    }
    if (req.method ==="POST") {
        const {user_id, shipped_date, address, postal, post, products} = req.body as orderType;
        const order = await db.order.create({
          data: {
            order_date: new Date(),
            shipped_date,
            address,
            postal,
            post,
            user_id: {
              connect:{id:user_id}
            },
            products: {
              connect: products.map((product) => ({
                product_id: product.product_id
              }))
            }
          }
        });
        res.status(200).json(order)
        return ;
    }

    if (req.method ==="PATCH") {
      const {order_id, user_id, shipped_date, address, postal, post, products} = req.body as orderType;
      const order = await db.order.update(
        {where:{order_id},
        data: {
          shipped_date,
          address,
          postal,
          post,
          user_id: {
            connect:{id:user_id}
          },
          products: {
            connect: products.map((product) => ({
              product_id: product.product_id
            }))
          }
        }
      });
      res.status(200).json(order)
      return ;
    }

    if (req.method ==="DELETE") {
      const {order_id} = req.body as orderType;
      const order = await db.order.delete({
        where:{
          order_id
        },
      })  

      res.status(200).json(order)
      return ;

    }
  }