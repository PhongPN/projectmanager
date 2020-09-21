import {
  createUserGroup,
  findOneUserGroup,
  findUserGroupByName,
  updateUserGroup,
  deleteUserGroup,
} from './userGroup.js';

export const createUserGroupAPI = async (req, res) => {
  try {
    const result = await createUserGroup(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneUserGroupAPI = async (req, res) => {
  try {
    const result = await findOneUserGroup(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findUserGroupByNameAPI = async (req, res) => {
  try {
    const result = await findUserGroupByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateUserGroupAPI = async (req, res) => {
  try {
    const result = await updateUserGroup(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteUserGroupAPI = async (req, res) => {
  try {
    const result = await deleteUserGroup(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};