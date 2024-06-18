import Joi from "joi";

export const signupValidation = async (body) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).max(6).required(),
      role: Joi.string().valid("user", "admin", "moderator").required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: "Bad request",
        value: "",
      };
    }
    return {
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      messages: "Bad request",
      value: "",
    };
  }
};

export const otpValidation = async (body) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
      otp: Joi.string().min(6).max(6).required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: "Bad request",
        value: "",
      };
    }
    return {
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      messages: "Bad request",
      value: "",
    };
  }
};

export const signinValidation = async (body) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).max(6).required(),
      role: Joi.string().valid("user", "admin", "moderator").required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: "Bad request",
        value: "",
      };
    }
    return {
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      messages: "Bad request",
      value: "",
    };
  }
};

export const refreshTokenValidation = async (body) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).max(6).required(),
      role: Joi.string().valid("user", "admin", "moderator").required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: "Bad request",
        value: "",
      };
    }
    return {
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      messages: "Bad request",
      value: "",
    };
  }
};
