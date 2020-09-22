import {
  createDepartment,
  findOneDepartment,
  findDepartmentByName,
  updateDepartment,
  deleteDepartment,
} from './department.js';

export const createDepartmentAPI = async (req, res) => {
  try {
    const result = await createDepartment(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneDepartmentAPI = async (req, res) => {
  try {
    const result = await findOneDepartment(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findDepartmentByNameAPI = async (req, res) => {
  try {
    const result = await findDepartmentByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateDepartmentAPI = async (req, res) => {
  try {
    const result = await updateDepartment(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteDepartmentAPI = async (req, res) => {
  try {
    const result = await deleteDepartment(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};