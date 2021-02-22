import nc, { NextHandler } from "next-connect";
import util from "../modules/util";
import JwtModule from "../modules/JwtModule";
import statusCode from "../modules/statusCode";
import responseMessage from "../modules/responseMessage";
import User from "../models/User";

const checkToken = () => async (req: any, res: any, next: NextHandler) => {
  const TOKEN_EXPIRED = -3;
  const TOKEN_INVALID = -2;
  const jwt = new JwtModule();
  const token = req.headers.accesstoken;
  if (!token) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
  }

  const decodedToken = await jwt.verify(token);
  if (decodedToken === TOKEN_EXPIRED) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
  }
  if (decodedToken === TOKEN_INVALID) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
  }

  const id = decodedToken.id;
  const snsId = decodedToken.snsId;
  const socialType = decodedToken.socialType;
  console.log(snsId);
  console.log(socialType);

  if (!id) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN);
  } else {
    const userInfo = await User.findOne({ snsId, socialType });
    if (!userInfo) {
      return res
        .status(statusCode.FORBIDDEN)
        .send(util.fail(statusCode.FORBIDDEN, responseMessage.LOGIN_REQUIRED));
    }
    req.user = userInfo;
  }
  next();
};

export default checkToken;
