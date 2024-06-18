import {
  signupService,
  otpService,
  signinService,
  logoutService,
  refreshTokenService,
  getMeService,
} from "../services/auth.service.js";
import {
  signupValidation,
  otpValidation,
  signinValidation,
  refreshTokenValidation,
} from "../validations/auth.validation.js";

export const signupController = async (req, res) => {
  try {
    const { body } = req;

    const { messages, value } = await signupValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await signupService(value);

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const verify_otpController = async (req, res) => {
  try {
    const { body } = req;

    const { messages, value } = await otpValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, message } = await otpService(value);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const signinController = async (req, res) => {
  try {
    const { body } = req;

    const { error, value } = await signinValidation(body);

    if (error) return res.status(400).send("Bad request");

    const { status, values, message } = await signinService(value);

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const logoutController = async (req, res) => {
  try {
    const { status, values, message } = await logoutService();

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const refresh_tokenController = async (req, res) => {
  try {
    const { body } = req;

    const { error, value } = await refreshTokenValidation(body);

    if (error) return res.status(400).send("Bad request");

    const { status, values, message } = await refreshTokenService(value);

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const getMeController = async (req, res) => {
  try {
    const { status, values, message } = await getMeService();

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
