import { getServerAuthSession } from "@/server/auth";
import { getUserStatus } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { refreshToken } = await getServerAuthSession({ req, res });

  const response = await getUserStatus(refreshToken);

  const data = await response.json();
  return res.status(200).json(data);
  //   res.status(200).json(await getSession({ req }));
}
