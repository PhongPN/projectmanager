import express from 'express';

import {
  createEmployeeAPI,
  findOneEmployeeAPI,
  findEmployeeByNameAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from '../controller/employee/employeeAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/employees', verifyToken, createEmployeeAPI);

//Find projects kind
router.get('/employees', verifyToken, findEmployeeByNameAPI);

//Find project kind
router.get('/employees/:id', verifyToken, findOneEmployeeAPI);

//Update project kind
router.put('/employees/:id', verifyToken, updateEmployeeAPI);

//Delete project kind
router.delete('/employees/:id', verifyToken, deleteEmployeeAPI);

export default router;