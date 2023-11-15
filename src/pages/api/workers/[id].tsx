import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

interface userInfo {
  id: string;
  isWorker: boolean;
  isAdmin: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  if (req.method == "POST") {
    const { isWorker, isAdmin } = req.body as userInfo;
    console.log(isAdmin, isWorker);

    if (isWorker != undefined && isAdmin != undefined) {
      const user = await db.user.update({
        where: { id },
        data: { isWorker, isAdmin },
      });
      res.status(200).json(user);
      return;
    } else if (isWorker != undefined) {
      const user = await db.user.update({
        where: { id },
        data: { isWorker },
      });
      res.status(200).json(user);
      return;
    } else if (isAdmin != undefined) {
      const user = await db.user.update({
        where: { id },
        data: { isAdmin },
      });
      res.status(200).json(user);
      return;
    } else {
      res.status(400).json("Brak potrzebnych danych");
    }
  }
}
