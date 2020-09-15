import { login } from './admin.js';

export const Login = async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};