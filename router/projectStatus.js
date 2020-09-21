import express from 'express';

import {
  createProjectStatusAPI,
  findOneProjectStatusAPI,
  findProjectStatusByNameAPI,
  updateProjectStatusAPI,
  deleteProjectStatusAPI,
} from '../controller/projectStatus/projectStatusAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/projectstatuses', verifyToken, createProjectStatusAPI);

//Find projects kind
router.get('/projectstatuses', verifyToken, findProjectStatusByNameAPI);

//Find project kind
router.get('/projectstatuses/:id', verifyToken, findOneProjectStatusAPI);

//Update project kind
router.put('/projectstatuses/:id', verifyToken, updateProjectStatusAPI);

//Delete project kind
router.delete('/projectstatuses/:id', verifyToken, deleteProjectStatusAPI);

export default router;