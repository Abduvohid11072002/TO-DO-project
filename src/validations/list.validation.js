import Joi from "joi";

export const listValidation = async (body) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required()
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
