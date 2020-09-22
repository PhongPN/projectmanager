import {
  createEmployee,
  findOneEmployee,
  findEmployeeByName,
  updateEmployee,
  deleteEmployee,
} from './employee.js';

export const createEmployeeAPI = async (req, res) => {
  try {
    const result = await createEmployee(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneEmployeeAPI = async (req, res) => {
  try {
    const result = await findOneEmployee(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findEmployeeByNameAPI = async (req, res) => {
  try {
    const result = await findEmployeeByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const updateEmployeeAPI = async (req, res) => {
  try {
    const result = await updateEmployee(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteEmployeeAPI = async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};