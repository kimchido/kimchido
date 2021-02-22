import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { checkToken } from "../../../middlewares/authMiddleware";
import useDatabase from "../../../middlewares/useDatabase";
import User from "../../../models/User";
import responseMessage from "../../../modules/responseMessage";
import statusCode from "../../../modules/statusCode";
import util from "../../../modules/util";

const handler = nc()
  .use(useDatabase())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;
    try {
      const user = await User.findOne({ where: { username } });
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
