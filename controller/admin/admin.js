import Admin from '../../model/admin.js';
import { generateToken } from '../../helper/jwt.js';
import { createSuccessLog, createErrorLog } from '../../helper/log.js';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SERVER_ERROR,
  ADMIN_EXIST,
  CREATE_ADMIN_SUCCESS,
} from '../../status/status.js';

//login
const login = async (data) => {
  try {
    if (!data.username || !data.password) {
      return {
        status: 400,
        code: LOGIN_FAILED,
        message: 'missing username or password',
      };
    }
    const result = await Admin.verifyPassword(data);

    if (!result.error) {
      const token = await generateToken(result.message);
      createSuccessLog({ status: 200, code: LOGIN_SUCCESS, message: 'Login success' });

      return {
        status: 200,
        code: LOGIN_SUCCESS,
        message: 'Login success',
        data: token,
      };
    } else {
      createErrorLog({ status: 400, code: LOGIN_FAILED, message: 'Login failed' });

      return {
        status: 400,
        code: LOGIN_FAILED,
        message: 'Login failed',
      };
    }


  } catch (err) {
    createErrorLog({ status: 500, code: SERVER_ERROR, message: 'Server error' });

    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Create admin
const createAdmin = async (data) => {
  try {
    const findExistAdmin = await Admin.findOne({ userName: data.username });

    if (findExistAdmin) {
      return {
        status: 400,
        code: ADMIN_EXIST,
        message: 'Admin exist',
      };
    }

    const admin = await Admin.create({ userName: data.username, passWord: data.password });

    return {
      status: 200,
      code: CREATE_ADMIN_SUCCESS,
      message: 'Create success',
      data: admin,
    };
  } catch (err) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

export {
  login,
  createAdmin,
};