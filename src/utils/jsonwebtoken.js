import jwt from "jsonwebtoken";
import configuration from "../config/configuration.js";

export const createToken = async (payload, secret_key, expires) => {
  try {
    const token = jwt.sign(payload, secret_key, expires);
    return token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const decodeToken = (token) => {
  try {
    const { ACCESS_TOKEN_KEY } = configuration.token;

    const decode = jwt.verify(token, ACCESS_TOKEN_KEY);

    return decode;
  } catch (error) {
    console.log(error);

    return false;
  }
};
