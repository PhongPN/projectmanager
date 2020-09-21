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
    const result = await findOneProjectKind(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findProjectKindByNameAPI = async (req, res) => {
  try {
    const result = await findProjectKindByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateProjectKindAPI = async (req, res) => {
  try {
    const result = await updateProjectKind(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteProjectKindAPI = async (req, res) => {
  try {
    const result = await deleteProjectKind(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};