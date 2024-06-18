import {
  createTagService,
  getAllTagsService,
  getOneTagService,
  updateTagService,
  deleteTagService,
} from "../services/tags.service.js";
import { tagsValidation } from "../validations/tags.validation.js";

export const createTagController = async (req, res) => {
  try {
    const { body, user } = req;

    const { messages, value } = await tagsValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await createTagService(value, user);

    if (status === 201) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getAllTagsController = async (req, res) => {
  try {
    const { user } = req;

    const { status, values, message } = await getAllTagsService(user);

    if (status === 200) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

export const getOneTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, values, message } = await getOneTagService(id);

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

    const { messages, value } = await tagsValidation(body);

    if (!value) return res.status(400).send(messages);

    const { status, values, message } = await updateTagService(
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

    const { status, message } = await deleteTagService(params.id, user);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
