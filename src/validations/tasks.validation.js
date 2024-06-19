import Joi from "joi";

export const taskValidation = async (body) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      listid: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
      priorityid: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
      duedate: Joi.date().required(),
      status: Joi.string()
        .valid("pending", "in_progress", "completed")
        .required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return {
        messages: error.details[0].message,
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
