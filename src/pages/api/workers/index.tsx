import { type NextApiResponse, type NextApiRequest } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    const workers = await db.user.findMany({ where: { isWorker: true } });
    const admins = await db.user.findMany({ where: { isAdmin: true } });
    res.send({ workers, admins });
    return;
  }
}
