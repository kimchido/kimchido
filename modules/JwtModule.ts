import { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/TokenPayload";

class JwtModule {
  private secretKey = process.env.JWT_SECRET;
  private options = {
    // algorithm: "HS256",
    expiresIn: process.env.JWT_EXPIRATION,
    issuer: process.env.JWT_ISSUER,
  };
  private TOKEN_EXPIRED = -3;
  private TOKEN_INVALID = -2;

  public createToken = (
    user: IUser,
  ): { expiresIn: number; accessToken: string } => {
    const payload: TokenPayload = {
      id: user.id,
      snsId: user.snsId,
      snsType: user.snsType,
    };
    const result = {
      expiresIn: Number(this.options.expiresIn.slice(0, -1)) * 86400,
      accessToken: jwt.sign(payload, this.secretKey, this.options),
      // refreshToken: jwt.sign(payload, secretKey, refreshOptions),
    };
    return result;
  };
  public verify = (token: string) => {
    let decoded: any;
    try {
      decoded = jwt.verify(token, this.secretKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("expired token");
        return this.TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        console.log("invalid token");
        console.log(this.TOKEN_INVALID);
        return this.TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return this.TOKEN_INVALID;
      }
    }
    return decoded;
  };
}

export default JwtModule;
