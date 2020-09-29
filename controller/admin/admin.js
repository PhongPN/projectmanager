import Admin from '../../model/admin.js';
import { generateToken } from '../../helper/jwt.js';
import { createSuccessLog, createErrorLog } from '../../helper/log.js';
import {
  MISSING_INPUT,
  USERNAME_NOTFOUND,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SERVER_ERROR,
  // ADMIN_EXIST,
  // CREATE_ADMIN_SUCCESS,
} from '../../status/status.js';

//login
const login = async (data) => {
  try {
    //check null
    if (!data.username || !data.password) {
      return {
        status: 400,
        message: MISSING_INPUT,
      };
    }

    //Find username
    const admin = await Admin.findOne({ userName: data.username });
    if (!admin) {
      return {
        status: 400,
        message: USERNAME_NOTFOUND,
      };
    }

    //Check password
    const result = await Admin.verifyPassword(data, admin);
    if (!result) {
      createErrorLog({ status: 400, LOGIN_FAILED });

      return {
        status: 400,
        message: LOGIN_FAILED,
      };
    }

    //Create token
    const token = await generateToken(result.message);
    createSuccessLog({ status: 200, LOGIN_SUCCESS });

    return {
      status: 200,
      message: LOGIN_SUCCESS,
      data: token,
    };


  } catch (err) {
    createErrorLog({ status: 500, SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

// //Create admin
// const createAdmin = async (data) => {
//   try {
//     const findExistAdmin = await Admin.findOne({ userName: data.username });

//     if (findExistAdmin) {
//       return {
//         status: 400,
//         code: ADMIN_EXIST,
//         message: 'Admin exist',
//       };
//     }

//     const admin = await Admin.create({ userName: data.username, passWord: data.password });

//     return {
//       status: 200,
//       code: CREATE_ADMIN_SUCCESS,
//       message: 'Create success',
//       data: admin,
//     };
//   } catch (err) {
//     return {
//       status: 500,
//       code: SERVER_ERROR,
//       message: 'Server error',
//     };
//   }
// };

export {
  login,
  // createAdmin,
};