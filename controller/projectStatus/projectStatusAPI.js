import {
  createProjectStatus,
  findOneProjectStatus,
  findProjectStatusByName,
  updateProjectStatus,
  deleteProjectStatus,
} from './projectStatus.js';

export const createProjectStatusAPI = async (req, res) => {
  try {
    const result = await createProjectStatus(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneProjectStatusAPI = async (req, res) => {
  try {
    const result = await findOneProjectStatus(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findProjectStatusByNameAPI = async (req, res) => {
  try {
    const result = await findProjectStatusByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateProjectStatusAPI = async (req, res) => {
  try {
    const result = await updateProjectStatus(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteProjectStatusAPI = async (req, res) => {
  try {
    const result = await deleteProjectStatus(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};