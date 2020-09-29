//Save update $push[], $set{}
//UpdateOne({})
//UpdateMany
//index mongo
//Populate
//Enum

import Employee from '../../model/employee.js';
import TechStack from '../../model/techStack.js';
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
  FIND_TECH_STACK_FAILED,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { createErrorLog } from '../../helper/log.js';
import { checkNumber, checkNull, checkArray } from '../../helper/checkInput.js';

//Create a kind of project
const createEmployee = async (data) => {
  try {

    //Check Number
    if (checkNumber(data.employeeNumber, data.employeePhone) === false) {
      return {
        status: 400,
        message: EMPLOYEE_INPUT_INVALID,
      };
    }

    //Check Null
    if (checkNull(data.employeeName, data.employeeBirthDay,
      data.employeeAddress, data.employeeCertificate, data.employeeForeignlanguage) === true) {
      return {
        status: 400,
        message: EMPLOYEE_INPUT_INVALID,
      };
    }

    //Find tech stack
    let techStackIds = [];
    for (let i = 0; i < data.employeeTechStack.length; i++) {
      techStackIds.push(data.employeeTechStack[i].techStackId);
    }
    const findTechStack = await TechStack.find({ _id: { $in: techStackIds } });

    if (checkArray(data.employeeTechStack, findTechStack) === false) {
      return {
        status: 400,
        message: FIND_TECH_STACK_FAILED,
      };
    }

    //Check exist employee
    const findExistEmployee = await Employee.findOne({ employeeName: data.employeeName });
    if (findExistEmployee) {
      return {
        status: 400,
        message: EMPLOYEE_EXIST,
      };
    }

    //Create employee
    const createEmployee = await Employee.create(data);

    return {
      status: 200,
      message: CREATE_EMPLOYEE_SUCCESS,
      data: createEmployee,
    };
  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
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
        message: EMPLOYEE_INPUT_INVALID,
      };
    }
    if (checkNumber(page)) {
      page = 1;
    }
    if (checkNumber(limit)) {
      limit = 10;
    }

    const findListEmployee = await Search(Employee, 'employeeName', data.employeeName, page, limit);
    //check lenght
    if (findListEmployee.lenght === 0) {
      return {
        status: 400,
        message: FIND_EMPLOYEE_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_EMPLOYEE_SUCCESS,
      data: findListEmployee,
    };

  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find ond project kind by id
const findOneEmployee = async (id) => {
  try {
    const findEmployee = await Employee.findOne({ _id: id });
    if (!findEmployee) {
      return {
        status: 400,
        message: FIND_EMPLOYEE_FAILED,
      };
    }
    else {
      return {
        status: 200,
        message: FIND_EMPLOYEE_SUCCESS,
        data: findEmployee,
      };
    }
  }
  catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Update project kind
const updateEmployee = async (id, data) => {
  try {//update

    const updateEmployee = await Employee.findOneAndUpdate({ _id: id }, data);
    if (!updateEmployee) {
      return {
        status: 400,
        message: UPDATE_EMPLOYEE_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_EMPLOYEE_SUCCESS,
      data: updateEmployee,
    };

  } catch (error) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Delete project kind
const deleteEmployee = async (id) => {
  try {
    const user = await Employee.findOneAndRemove({ _id: id });
    if (!user) {
      return {
        status: 400,
        message: DELETE_EMPLOYEE_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_EMPLOYEE_SUCCESS,
    };

  } catch (error) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
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