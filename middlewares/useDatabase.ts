import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../utils/dbConnect";

const useDatabase = () => async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any,
) => {
  await dbConnect();
  next();
};

export default useDatabase;
