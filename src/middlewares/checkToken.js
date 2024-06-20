import pool from "../config/database.js";
import { decodeToken } from "../utils/jsonwebtoken.js";

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).send("Authorization failed");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(403).send("Authorization failed");
    }

    const decoded = decodeToken(token);
    if (decoded === false) {
      return res.status(403).send("Authentication failed");
    };

    req.user = decoded;
    
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Authentication failed");
  }
};

export const checkTokenRole = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).send("Authorization header missing");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(403).send("Authorization failed");
    }

    const decoded = decodeToken(token);

    req.user = decoded;

    let { originalUrl } = req;
    const urlParts = originalUrl.split("/");

    if (decoded.role === "admin") {
      next();
      
    } else if (urlParts.length === 2) {
      const query = `SELECT * FROM ${urlParts[1]} WHERE ownerid = $1`;
      const values = [decoded.id];

      const { rows } = await pool.query(query, values);

      if (rows.length > 0) {
        next();
      } else {
        res.status(403).send("Authorization role failed");
      }
    } else if (urlParts.length === 3) {
      const query = `SELECT * FROM ${urlParts[1]} WHERE ownerid = $1 AND id = $2`;
      const values = [decoded.id, urlParts[2]];

      const { rows } = await pool.query(query, values);

      if (rows.length > 0) {
        next();
      } else {
        res.status(403).send("Authorization role failed");
      }
    } else {
      res.status(403).send("Invalid URL");
    }
  } catch (error) {
    console.error(error);
    res.status(403).send("Authentication failed");
  }
};
