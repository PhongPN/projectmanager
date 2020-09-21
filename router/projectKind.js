import express from 'express';

import {
  createProjectKindAPI,
  findProjectKindByNameAPI,
  findOneProjectKindAPI,
  updateProjectKindAPI,
  deleteProjectKindAPI,
} from '../controller/projectKind/projectKindAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/projectkinds/', verifyToken, createProjectKindAPI);

//Find projects kind
router.get('/projectkinds/', verifyToken, findProjectKindByNameAPI);

//Find project kind
router.get('/projectkinds/:id', verifyToken, findOneProjectKindAPI);

//Update project kind
router.put('/projectkinds/:id', verifyToken, updateProjectKindAPI);

//Delete project kind
router.delete('/projectkinds/:id', verifyToken, deleteProjectKindAPI);

export default router;