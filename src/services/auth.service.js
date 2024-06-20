import pool from "../config/database.js";
import { generate } from "otp-generator";
import { sendEmail } from "../utils/nodemailer.js";
import { compare, hash } from "bcrypt";
import configuration from "../config/configuration.js";
import { createToken } from "../utils/jsonwebtoken.js";

export const signupService = async (user) => {
  try {
    const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (existUser.rows.length === 1) {
      return {
        status: 400,
        values: "",
        message: "User already exist",
      };
    }
    const { email, username, password, role } = user;

    const { BCRYPT_SALT } = configuration.salt;

    const hashedPassword = await hash(password, Number(BCRYPT_SALT));

    const newUser = await pool.query(
      `INSERT INTO users (email, username, password, role)
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, username, hashedPassword, role]
    );

    const otp = generate(6, { specialChars: false, upperCaseAlphabets: false });

    const send = await sendEmail(email, otp);

    if (!send) {
      return {
        status: 400,
        values: "",
        message: "Bad request",
      };
    }

    await pool.query(`INSERT INTO otps (id, otp) VALUES ($1, $2)`, [
      newUser.rows[0].id,
      otp,
    ]);

    return {
      status: 201,
      message: "Created successfully",
      values: {
        message: "Created successfully",
        userId: newUser.rows[0].id,
        otpSend: true,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const otpService = async (user) => {
  try {
    const existUserResult = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [user.userId]
    );
    console.log(existUserResult.rows);
    if (existUserResult.rows.length !== 1) {
      return {
        message: "Not Found",
        status: 404,
      };
    }

    const otpResult = await pool.query(`SELECT * FROM otps WHERE id = $1`, [
      user.userId,
    ]);
    if (otpResult.rows.length === 0 || otpResult.rows[0].otp !== user.otp) {
      return {
        status: 400,
        message: "Your One Time Password Doesn't Match",
      };
    }

    await pool.query(`DELETE FROM otps WHERE id = $1`, [user.userId]);

    const timeResult = await pool.query(`SELECT now()`);

    const currentTime = timeResult.rows[0].now;

    await pool.query(
      `UPDATE users SET updatedat = $1, status = $2 WHERE id = $3`,
      [currentTime, "active", user.userId]
    );

    return {
      status: 200,
      message: "Otp verified Account Active",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Bad request",
    };
  }
};

export const signinService = async (user) => {
  try {
    const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (existUser.rows.length !== 1) {
      return {
        status: 400,
        values: "",
        message: "Invalid Email",
      };
    }

    const checkPassword = await compare(
      user.password,
      existUser.rows[0].password
    );

    if (!checkPassword) {
      return {
        status: 400,
        values: "",
        message: "Invalid Password",
      };
    }

    const {
      ACCESS_TOKEN_KEY,
      ACCESS_TOKEN_TIME,
      REFRESH_TOKEN_KEY,
      REFRESH_TOKEN_TIME,
    } = configuration.token;

    const { id, password, email, role, username } = existUser.rows[0];

    const access_token = await createToken(
      { id, username, email, password, role },
      ACCESS_TOKEN_KEY,
      { expiresIn: ACCESS_TOKEN_TIME }
    );

    const refresh_token = await createToken(
      { id, username, email, password, role },
      REFRESH_TOKEN_KEY,
      { expiresIn: REFRESH_TOKEN_TIME }
    );

    if (!access_token && !refresh_token) {
      return {
        status: 400,
        values: "",
        message: "Token Error",
      };
    }
    const userToken = await pool.query(
      `SELECT * FROM refresh_token WHERE username =$1`,
      [username]
    );

    if (userToken.rows.length > 0) {
      await pool.query(
        `UPDATE refresh_token SET refresh = $1 WHERE username = $2`,
        [refresh_token, username]
      );
    } else {
      await pool.query(
        `INSERT INTO refresh_token (username, refresh) VALUES ($1, $2)`,
        [username, refresh_token]
      );
    }

    return {
      status: 200,
      values: { access_token, refresh_token },
      message: "Created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const logoutService = async (user) => {
  try {
    const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (existUser.rows.length !== 1) {
      return {
        status: 404,
        message: "User Not Found",
      };
    }

    await pool.query(`DELETE FROM refresh_token WHERE username = $1`, [
      user.username,
    ]);

    return {
      status: 200,
      message: {
        message: "Logout successfully",
        accessToken: false,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      message: "Bad request",
    };
  }
};

export const refreshTokenService = async (token) => {
  try {
    const existToken = await pool.query(
      `SELECT * FROM refresh_token WHERE refresh = $1`,
      [token.refreshToken]
    );

    if (existToken.rows.length !== 1) {
      return {
        status: 404,
        values: "",
        message: "Token Not Found",
      };
    }

    const existUser = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [existToken.rows[0].username]
    );

    if (existUser.rows.length !== 1) {
      return {
        status: 404,
        values: "",
        message: "User Not Found",
      };
    }

    const {
      ACCESS_TOKEN_KEY,
      ACCESS_TOKEN_TIME,
      REFRESH_TOKEN_KEY,
      REFRESH_TOKEN_TIME,
    } = configuration.token;

    const { id, password, email, role, username } = existUser.rows[0];

    const access_token = await createToken(
      { id, username, email, password, role },
      ACCESS_TOKEN_KEY,
      { expiresIn: ACCESS_TOKEN_TIME }
    );

    const refresh_token = await createToken(
      { id, username, email, password, role },
      REFRESH_TOKEN_KEY,
      { expiresIn: REFRESH_TOKEN_TIME }
    );

    if (!access_token && !refresh_token) {
      return {
        status: 400,
        values: "",
        message: "Token Error",
      };
    }

    await pool.query(
      `UPDATE refresh_token SET username = $1 WHERE refresh = $2`,
      [username, refresh_token]
    );

    return {
      status: 201,
      values: { access_token, refresh_token },
      message: "Created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const getMeService = async (user) => {
  try {
    const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    const userData = existUser.rows[0];

    return {
      status: 200,
      values: { userData },
      message: "Created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};
