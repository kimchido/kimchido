import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import User, { IUser } from "../../../../models/User";
import JwtModule from "../../../../modules/JwtModule";
import responseMessage from "../../../../modules/responseMessage";
import statusCode from "../../../../modules/statusCode";
import util from "../../../../modules/util";
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const jwt = new JwtModule();
  const { method } = req;
  if (method === "GET") {
    const KAKAO_ID = process.env.KAKAO_ID;
    const KAKAO_SECRET = process.env.KAKAO_SECRET;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const { code } = req.query;
    let tokenResponse: any;
    try {
      tokenResponse = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: KAKAO_ID,
          client_secret: KAKAO_SECRET,
          redirect_uri: KAKAO_REDIRECT_URI,
          code,
        }),
      });
    } catch (error) {
      // TODO: Cleanup
      console.log(error);
      return res.json(error.data);
    }
    console.info("==== tokenResponse.data ====");

    const { access_token } = tokenResponse.data;

    let userResponse;
    try {
      userResponse = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      // TODO: Cleanup
      console.log(error);
      return res.json(error.data);
    }
    console.info("==== userResponse.data ====");
    console.log(userResponse.data);

    const {
      data: {
        properties: { nickname: username, profile_image: avatarUrl },
        id,
      },
    } = userResponse;
    const snsId = id.toString();
    const socialType = "kakao";
    try {
      console.log(snsId);
      console.log(socialType);
      const alreadyUser = await User.findOne({ snsId, socialType });
      console.log(alreadyUser);
      if (alreadyUser) {
        const { accessToken } = jwt.createToken(alreadyUser);
        return res.status(statusCode.OK).json(
          util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
            alreadyUser,
            accessToken,
          }),
        );
      }
      const newUser: IUser = new User({
        username,
        snsId,
        socialType,
        avatarUrl,
      });
      await newUser.save();
      const { accessToken } = jwt.createToken(newUser);
      res.status(statusCode.OK).json(
        util.success(statusCode.OK, responseMessage.CREATE_USER_SUCCESS, {
          newUser,
          accessToken,
        }),
      );
    } catch (e) {
      console.log(e);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  }
};

export default handler;
