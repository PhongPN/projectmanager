import {
  createProjectKind,
  findOneProjectKind,
  findProjectKindByName,
  updateProjectKind,
  deleteProjectKind,
} from './projectKind.js';

export const createProjectKindAPI = async (req, res) => {
  try {
    const result = await createProjectKind(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneProjectKindAPI = async (req, res) => {
  try {
    const result = await findOneProjectKind(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findProjectKindByNameAPI = async (req, res) => {
  try {
    const result = await findProjectKindByName(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateProjectKindAPI = async (req, res) => {
  try {
    const result = await updateProjectKind(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteProjectKindAPI = async (req, res) => {
  try {
    const result = await deleteProjectKind(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};