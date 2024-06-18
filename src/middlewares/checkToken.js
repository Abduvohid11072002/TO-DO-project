import { decodeToken }from "../utils/jsonwebtoken.js";

export const checkToken = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(403).send("Authorization failed");
    }

    const decode = decodeToken(token);

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);

    res.status(403).send("Authentication Failed");
  }
};
