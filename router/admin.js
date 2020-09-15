import express from 'express';

import { Login } from '../controller/admin/adminAPI.js';

const router = express.Router();

// Login
router.post('/login', Login);

export default router;