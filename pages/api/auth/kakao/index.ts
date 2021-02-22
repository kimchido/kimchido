import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === "GET") {
    const KAKAO_ID = process.env.KAKAO_ID;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    console.log(KAKAO_ID);
    console.log(KAKAO_REDIRECT_URI);
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    return res.redirect(kakaoAuthUrl);
  }
};

export default handler;
