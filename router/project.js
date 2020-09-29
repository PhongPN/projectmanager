import express from 'express';

import {
  createProjectAPI,
  findOneProjectAPI,
  findProjectByNameAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from '../controller/project/projectAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/projects', verifyToken, createProjectAPI);

//Find projects kind
router.get('/projects', verifyToken, findProjectByNameAPI);

//Find project kind
router.get('/projects/:id', verifyToken, findOneProjectAPI);

//Update project kind
router.put('/projects/:id', verifyToken, updateProjectAPI);

//Delete project kind
router.delete('/projects/:id', verifyToken, deleteProjectAPI);

export default router;