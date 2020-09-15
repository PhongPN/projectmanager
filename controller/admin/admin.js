import Admin from '../../model/admin.js';
import { generateToken } from '../../helper/jwt.js';
import { createSuccessLog, createErrorLog } from '../../helper/log.js';
import { LOGIN_SUCCESS, LOGIN_FAILED, SERVER_ERROR } from '../../status/status.js';

const login = async (data) => {
  try {
    if(!data.username || !data.password){
      return {
        status: 400,
        code: LOGIN_FAILED,
        message: 'missing username or password',
      };
    }
    const result = await Admin.verifyPassword(data);
    if (!result.error) {
      const token = await generateToken(result.message);
      createSuccessLog({
        status: 200,
        code: LOGIN_SUCCESS,
        message: 'Login success',
      });

      return {
        status: 200,
        code: LOGIN_SUCCESS,
        message: 'Login success',
        data: token,
      };
    } else {
      createErrorLog({
        status: 400,
        code: LOGIN_FAILED,
        message: 'Login failed',
      });

      return {
        status: 400,
        code: LOGIN_FAILED,
        message: 'Login failed',
      };
    }


  } catch (err) {
    createErrorLog({
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    });

    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

export {
  login,
};