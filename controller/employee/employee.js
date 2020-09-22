//Save update $push[], $set{}
//UpdateOne({})
//UpdateMany
//index mongo
//Populate

import Employee from '../../model/employee.js';
import {
  EMPLOYEE_EXIST,
  CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_INPUT_INVALID,
  FIND_EMPLOYEE_FAILED,
  FIND_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE_SUCCESS,
  SERVER_ERROR,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';

//Create a kind of project
const createEmployee = async (data) => {
  try {
    if (!data.employeeName || !data.employeeBirthDay || !data.employeeNumber || !data.employeePhone
      || !data.employeeAddress || !data.employeeCertificate || !data.employeeForeignlanguage ) {
      return {
        status: 400,
        code: EMPLOYEE_INPUT_INVALID,
        message: 'Missing employee profile',
      };
    }

    const findExistEmployee = await Employee.findOne({ employeeName: data.employeeName });
    if (findExistEmployee !== null) {
      return {
        status: 400,
        code: EMPLOYEE_EXIST,
        message: 'Project kind exist',
      };
    }

    const createEmployee = await Employee.create(data);

    return {
      status: 200,
      code: CREATE_EMPLOYEE_SUCCESS,
      message: 'Create project kind success',
      data: createEmployee,
    };
  } catch (err) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Find projects kind by name
//Set default cs6
const findEmployeeByName = async (data, page, limit) => {
  try {
    if (!data.employeeName) {
      return {
        status: 400,
        code: EMPLOYEE_INPUT_INVALID,
        message: 'Project kind name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListEmployee = await Search(Employee, 'employeeName', data.employeeName, page, limit);
    //check lenght
    if (typeof findListEmployee === 'undefined') {
      return {
        status: 400,
        code: FIND_EMPLOYEE_FAILED,
        message: 'Project kind not found',
      };
    }

    return {
      status: 200,
      code: UPDATE_EMPLOYEE_SUCCESS,
      message: 'Find project kind success',
      data: findListEmployee,
    };

  } catch (err) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Find ond project kind by id
const findOneEmployee = async (id) => {
  try {
    const findEmployee = await Employee.findOne({ _id: id });
    if (typeof findEmployee === 'undefined') {
      return {
        status: 400,
        code: FIND_EMPLOYEE_FAILED,
        message: 'Project kind not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_EMPLOYEE_SUCCESS,
        message: 'Find project kind success',
        data: findEmployee,
      };
    }
  }
  catch (err) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Update project kind
const updateEmployee = async (id, data) => {
  try {//update
    if (!data.employeeName || !data.employeeBirthDay || !data.employeeNumber || !data.employeePhone
      || !data.employeeAddress || !data.employeeCertificate || !data.employeeForeignlanguage ){
      return {
        status: 400,
        code: EMPLOYEE_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }
    let updateEmployee = await Employee.findOneAndUpdate({ _id: id }, data);
    if (!updateEmployee) {
      return {
        status: 400,
        code: UPDATE_EMPLOYEE_FAILED,
        message: 'Update project kind failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_EMPLOYEE_SUCCESS,
        message: 'update project kind success',
        data: updateEmployee,
      };
    }
  } catch (error) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Delete project kind
const deleteEmployee = async (id) => {
  try {
    let user = await Employee.findOneAndRemove({ _id: id });
    if (!user) {
      return {
        status: 400,
        code: DELETE_EMPLOYEE_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_EMPLOYEE_SUCCESS,
        message: 'Delete project kind success',
      };
    }
  } catch (error) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

export {
  createEmployee,
  findEmployeeByName,
  findOneEmployee,
  updateEmployee,
  deleteEmployee,
};