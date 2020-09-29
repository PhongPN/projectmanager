import express from 'express';

import {
  createDepartmentAPI,
  findOneDepartmentAPI,
  findDepartmentByNameAPI,
  updateDepartmentAPI,
  deleteDepartmentAPI,
} from '../controller/department/departmentAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/departments', verifyToken, createDepartmentAPI);

//Find projects kind
router.get('/departments', verifyToken, findDepartmentByNameAPI);

//Find project kind
router.get('/departments/:id', verifyToken, findOneDepartmentAPI);

//Update project kind
router.put('/departments/:id', verifyToken, updateDepartmentAPI);

//Delete project kind
router.delete('/departments/:id', verifyToken, deleteDepartmentAPI);

export default router;