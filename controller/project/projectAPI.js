import {
  createProject,
  findOneProject,
  findProjectByName,
  updateProject,
  deleteProject,
} from './project.js';

export const createProjectAPI = async (req, res) => {
  try {
    const result = await createProject(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneProjectAPI = async (req, res) => {
  try {
    const result = await findOneProject(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findProjectByNameAPI = async (req, res) => {
  try {
    const result = await findProjectByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateProjectAPI = async (req, res) => {
  try {
    const result = await updateProject(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteProjectAPI = async (req, res) => {
  try {
    const result = await deleteProject(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};