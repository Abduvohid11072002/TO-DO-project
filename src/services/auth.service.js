import pool from "../config/database.js";

signupService,
  otpService,
  signinService,
  logoutService,
  refreshTokenService,
  getMeService;

export const signupService = async (user) => {
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
    const {
      email,
      username,
      password,
      confirmPassword,
      role,
      firstName,
      lastName,
    } = user;

    const newUser = await pool.query(
      `INSERT INTO users ('email', 'username', 'password', 'confirmPassword', 'role', 'firstName', 'lastName')
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [email, username, password, confirmPassword, role, firstName, lastName]
    );
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};
