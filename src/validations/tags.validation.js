import Joi from "joi";

export const tagsValidation = async (body) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
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
