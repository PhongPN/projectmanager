import express from 'express';

import { Login, CreateAdmin } from '../controller/admin/adminAPI.js';

const router = express.Router();

// Login
router.post('/login', Login);

//Create
router.post('/admin/create', CreateAdmin);

export default router;