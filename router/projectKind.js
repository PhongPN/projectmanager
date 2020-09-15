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
router.post('/projectkind/create', verifyToken, createProjectKindAPI);

//Find projects kind
router.get('/projectkind/finds', verifyToken, findProjectKindByNameAPI);

//Find project kind
router.get('/projectkind/find', verifyToken, findOneProjectKindAPI);

//Update project kind
router.put('/projectkind/update', verifyToken, updateProjectKindAPI);

//Delete project kind
router.delete('/projectkind/delete', verifyToken, deleteProjectKindAPI);

export default router;