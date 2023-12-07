/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";
import { imageType } from "../images";
import { map } from "zod";
import { Prisma } from "@prisma/client";

export interface productType {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  isDigital: boolean;
  mainImage: string;
  imagesBase64: string[];
  categoriesID: number[];
  categories: { name: string }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const products = await db.product.findMany({
      include: { images: true, categories: true },
    });
    res.status(200).json(products);
    return;
  }
  if (req.method === "POST") {
    const {
      name,
      price,
      quantity,
      description,
      isDigital,
      mainImage,
      imagesBase64,
      categories,
    } = req.body as productType;
    if (!imagesBase64) {
      res.status(400).json("Brak zdjęć");
      return;
    }

    const base64Regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64Regex.test(mainImage)) {
      res.status(200).json("Nieprawidłowy plik");
      return;
    }

    for (const img of imagesBase64) {
      if (!base64Regex.test(img)) {
        res.status(200).json("Nieprawidłowy plik");
        return;
      }
    }

    interface imageKitType {
      image_id: number;
      source: string;
      product_id: number;
    }

    const response = await fetch(
      "https://sklepszkola-production.up.railway.app/api/images",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Image: mainImage }),
      },
    );
    const data = (await response.json()) as imageKitType;
    const mainImageUrl = data.source;
    const images: imageKitType[] = [];
    for (const img of imagesBase64) {
      const response = await fetch(
        "https://sklepszkola-production.up.railway.app/api/images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image: img }),
        },
      );
      const data = (await response.json()) as imageKitType;
      images.push(data);
    }

    // istniejąca kategoria
    const product = await db.product.create({
      data: {
        name,
        price,
        quantity,
        description,
        isDigital,
        mainImage: mainImageUrl,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category.name },
            create: { name: category.name },
          })),
        },
        images:
          {
            connect: images.map((img) => {
              return { image_id: img.image_id };
            }),
          } ?? undefined,
      },

      include: { images: true, categories: true },
    });
    res.status(200).json(product);
    return;
  }

  if (req.method === "PATCH") {
    const {
      product_id,
      name,
      price,
      quantity,
      description,
      isDigital,
      mainImage,
      categoriesID = [],
    } = req.body as productType;

    // Odłączenie istniejących już relacji z kategoriami
    if (categoriesID) {
      await db.product.update({
        where: { product_id },
        data: {
          categories: { set: [] },
        },
      });
    }

    const product = await db.product.update({
      where: {
        product_id,
      },
      data: {
        name,
        price,
        quantity,
        description,
        isDigital,
        mainImage,
        categories: {
          connect: categoriesID.map((id) => {
            return { category_id: id };
          }),
        },
      },
      include: { categories: true },
    });

    res.status(200).json(product);
    return;
  }

  if (req.method === "DELETE") {
    const { product_id } = req.body as productType;

    await db.image.deleteMany({
      where: {
        product_id,
      },
    });

    await db.favoriteProducts.deleteMany({
      where: {
        product_id,
      },
    });

    const product = await db.product.delete({
      where: {
        product_id,
      },
    });

    res.status(200).json(product);
    return;
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};
