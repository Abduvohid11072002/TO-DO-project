import {
  deleteListService,
  updateListService,
  getOneListService,
  getAllListService,
  createListService,
} from "../services/list.service.js";
import { listValidation } from "../validations/list.validation.js";

export const createListController = async (req, res) => {
  try {
    const { body, user } = req;

    const { messages, value } = await listValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await createListService(value, user);

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getListsController = async (req, res) => {
  try {
    const { user } = req;

    const { status, values, message } = await getAllListService(user);

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getOneListController = async (req, res) => {
  try {
    const { params, user } = req;

    const { status, values, message } = await getOneListService(
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

export const updateListController = async (req, res) => {
  try {
    const { body, user, params } = req;

    const { messages, value } = await listValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await updateListService(
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

export const deleteListController = async (req, res) => {
  try {
    const { params, user } = req;

    const { status, message } = await deleteListService(params.id, user);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
