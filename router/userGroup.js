import express from 'express';

import {
  createUserGroupAPI,
  findOneUserGroupAPI,
  findUserGroupByNameAPI,
  updateUserGroupAPI,
  deleteUserGroupAPI,
} from '../controller/userGroup/userGroupAPI.js';

import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

//Create
router.post('/usergroups', verifyToken, createUserGroupAPI);

//Find projects kind
router.get('/usergroups', verifyToken, findUserGroupByNameAPI);

//Find project kind
router.get('/usergroups/:id', verifyToken, findOneUserGroupAPI);

//Update project kind
router.put('/usergroups', verifyToken, updateUserGroupAPI);

//Delete project kind
router.delete('/usergroups', verifyToken, deleteUserGroupAPI);

export default router;