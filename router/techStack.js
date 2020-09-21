import express from 'express';

import {
  createTechStackAPI,
  findOneTechStackAPI,
  findTechStackByNameAPI,
  updateTechStackAPI,
  deleteTechStackAPI,
} from '../controller/teckStack/techStackAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/techstacks', verifyToken, createTechStackAPI);

//Find projects kind
router.get('/techstacks', verifyToken, findTechStackByNameAPI);

//Find project kind
router.get('/techstacks/:id', verifyToken, findOneTechStackAPI);

//Update project kind
router.put('/techstacks/:id', verifyToken, updateTechStackAPI);

//Delete project kind
router.delete('/techstacks/:id', verifyToken, deleteTechStackAPI);

export default router;