import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import useDatabase from "../../../middlewares/useDatabase";
import User from "../../../models/User";
import responseMessage from "../../../modules/responseMessage";
import statusCode from "../../../modules/statusCode";
import util from "../../../modules/util";

const handler = nc()
  .use(useDatabase())
  .get(async (req: any, res: NextApiResponse) => {
    const { username } = req.query;
    console.log(req.user);
    try {
      const user = await User.findOne({ username });
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.GET_ONE_USER_SUCCESS,
            user,
          ),
        );
    } catch (e) {
      console.log(e);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  });

export default handler;
