import Joi from "joi";

export const prioritiesValidation = async (body) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      level: Joi.number().valid(1, 2, 3).required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: error.details[0].message,
        value: "",
      };
    };
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
