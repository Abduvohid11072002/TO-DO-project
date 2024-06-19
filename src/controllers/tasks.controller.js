import {
  createTaskService,
  getAllTaskService,
  getOneTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/tasks.service.js";
import { taskValidation } from "../validations/tasks.validation.js";

export const createTaskController = async (req, res) => {
  try {
    const { body, user } = req;

    const { messages, value } = await taskValidation(body);

    if (!value) return res.status(400).send(messages);
    const { status, values, message } = await createTaskService(value, user);

    if (status === 201) return res.status(status).json({ values, message });

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const getAllTaskController = async (req, res) => {
  try {
    const { user } = req;

    const { status, values, message } = await getAllTaskService(user);

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getOneTaskController = async (req, res) => {
  try {
    const { params, user } = req;

    const { status, values, message } = await getOneTaskService(
      params.id,
      user
    );

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { body, user, params } = req;

    const { messages, value } = await taskValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await updateTaskService(
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

export const deleteTaskController = async (req, res) => {
  try {
    const { user, params } = req;

    const { status, message } = await deleteTaskService(params.id, user);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
