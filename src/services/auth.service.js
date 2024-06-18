import pool from "../config/database.js";
import { generate } from "otp-generator";
import { sendEmail } from "../utils/nodemailer.js";
import { compare, hash } from "bcrypt";
import configuration from "../config/configuration.js";

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

    if (existUser) {
      return {
        status: 400,
        values: "",
        message: "User already exist",
      };
    }
    const { email, username, password, role } = user;

    const newUser = await pool.query(
      `INSERT INTO users ('email', 'username', 'password','role')
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, username, password, role]
    );
    console.log(newUser);

    return {
      status: 201,
      values: {},
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

    if (existUser) {
      return {
        status: 400,
        values: "",
        message: "User already exist",
      };
    }
    const { email, username, password, role } = user;

    const newUser = await pool.query(
      `INSERT INTO users ('email', 'username', 'password','role')
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, username, password, role]
    );
    console.log(newUser);

    return {
      status: 201,
      values: {},
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

export const refreshTokenService = async (user) => {
  try {
    const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (existUser) {
      return {
        status: 400,
        values: "",
        message: "User already exist",
      };
    }
    const { email, username, password, role } = user;

    const newUser = await pool.query(
      `INSERT INTO users ('email', 'username', 'password','role')
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, username, password, role]
    );
    console.log(newUser);

    return {
      status: 201,
      values: {},
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

    if (existUser) {
      return {
        status: 400,
        values: "",
        message: "User already exist",
      };
    }
    const { email, username, password, role } = user;

    const newUser = await pool.query(
      `INSERT INTO users ('email', 'username', 'password','role')
      VALUES($1, $2, $3, $4) RETURNING *`,
      [email, username, password, role]
    );
    console.log(newUser);

    return {
      status: 201,
      values: {},
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
