import { logger } from "../utils/logger.js";

export const logMiddleware = async (req, res, next) => {
  try {
    let struct = `Url:${req.url} Method:${req.method} Params:${JSON.stringify(
      req.params
    )} Query:${JSON.stringify(req.query)} Body:${JSON.stringify(req.body)}`;
    logger.silly(struct);
  } catch (error) {
    logger.error(error);
  } finally {
    next();
  }
};
