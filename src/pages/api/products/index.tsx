/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";

export interface productType {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  isDigital: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET") { 
        const products = await db.product.findMany();
        res.status(200).json(products);
        return;
    }
    if (req.method ==="POST") {
        const {name, price, quantity, description, isDigital} = req.body as productType;
        const user = await db.product.create({
          data:{
            name,
            price,
            quantity,
            description,
            isDigital
          }
        })
        res.status(200).json(user)
        return ;
    }

    if (req.method ==="PATCH") {
        const {product_id, name, price, quantity, description, isDigital} = req.body as productType;
        const user = await db.product.update({
          where:{
            product_id
          },
          data: {
            name,
            price,
            quantity,
            description,
            isDigital
          }
        })  

        res.status(200).json(user)
        return;
    }

    if (req.method ==="DELETE") {
      const {product_id} = req.body as productType;
      const user = await db.product.delete({
        where:{
          product_id
        },
      })  

      res.status(200).json(user)
      return ;

    }
  }