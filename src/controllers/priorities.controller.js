import { prioritiesValidation } from "../validations/priorities.validation.js";
import {
  createPriorityService,
  getAllPriorityService,
  getOnePriorityService,
  updatePriorityService,
  deletePriorityService,
} from "../services/priorities.service.js";

export const createPriorityController = async (req, res) => {
  try {
    const { body } = req;

    const { messages, value } = await prioritiesValidation(body);

    if (!value) return res.status(400).send(messages);
    const { status, values, message } = await createPriorityService(value);

    if (status === 201) return res.status(status).json({ values, message });

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const getAllPrioritiesController = async (req, res) => {
  try {
    const { user } = req;

    const { status, values, message } = await getAllPriorityService(user);

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getOnePriorityController = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, values, message } = await getOnePriorityService(id);

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const updatePriorityController = async (req, res) => {
  try {
    const { body, user, params } = req;

    const { messages, value } = await tagsValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await updatePriorityService(
      params.id,
      value,
      user
    );

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const deletePriorityController = async (req, res) => {
  try {
    const { user, params } = req;

    const { status, message } = await deletePriorityService(params.id, user);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
