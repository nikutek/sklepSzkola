import ImageKit from "imagekit";
import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/szkolaaaa/",
  publicKey: "public_/+LytKfMQpryszlk5TiCCBsHWzE=",
  privateKey: "private_3qm284t9d5WvtWdhHl5PI7prWtM=",
});

interface imageType {
  base64Image: string;
  fileName: string;
  tags: string[];
  productId: number;
}

interface resultType {
  fileId: string;
  name: string;
  size: number;
  versionInfo: { id: string; name: string };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    const images = await db.image.findMany();

    res.send(images);
    return;
  }

  if (req.method == "POST") {
    const { base64Image, fileName, productId } = req.body as imageType;

    if (!(base64Image && fileName && productId)) {
      res.status(200).json("Brak wszystkich danych");
    }

    const base64Regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64Regex.test(base64Image)) {
      res.status(200).json("Nieprawidłowy plik");
      return;
    }

    function uploadImage(base64Image: string, fileName: string) {
      return new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: base64Image, // required
            fileName: fileName, // required
          },
          (error, result) => {
            if (error) {
              console.log(error);
              reject("Internal Server Error");
              return;
            }
            if (!result) {
              reject("Internal Server Error");
              return;
            }
            resolve(result);
          },
        );
      });
    }

    try {
      const result = (await uploadImage(base64Image, fileName)) as resultType;
      const image = await db.image.create({
        data: { source: result.url, product_id: productId },
        include: { product: true },
      });
      console.log(result);

      res.status(200).json(image);
      return;
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method == "DELETE") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { image_id }: { image_id: number } = req.body;

    if (!image_id) {
      res.status(400).json("Brak image_id");
    }

    try {
      const image = await db.image.delete({ where: { image_id: image_id } });
      res.status(200).json(image);
      return;
    } catch (err) {
      console.log(err);
      res.status(400).json("Błąd podczas usuwania");
      return;
    }
  }
}
