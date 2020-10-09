import Department from '../../model/department.js';
import TechStack from '../../model/techStack.js';
import Project from '../../model/project.js';
import Employee from '../../model/employee.js';
import {
  DEPARTMENT_EXIST,
  CREATE_DEPARTMENT_SUCCESS,
  DEPARTMENT_INPUT_INVALID,
  FIND_DEPARTMENT_FAILED,
  FIND_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAILED,
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT_SUCCESS,
  SERVER_ERROR,
  FIND_TECH_STACK_FAILED,
  FIND_EMPLOYEE_FAILED,
  FIND_PROJECT_FAILED,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { createErrorLog } from '../../helper/log.js';
import { checkNull, checkArray, checkNumber } from '../../helper/checkInput.js';

//Create a kind of project
const createDepartment = async (data) => {
  try {
    //Check null

    if (checkNull(data.departmentName, data.departmentResponsibility
      , data.departmentTechStack) === true) {

      return {
        status: 400,
        message: DEPARTMENT_INPUT_INVALID,
      };
    }

    //Find exist department
    const findExistDepartment = await Department.findOne({ departmentName: data.departmentName });
    if (findExistDepartment) {
      return {
        status: 400,
        message: DEPARTMENT_EXIST,
      };
    }

    //Find tech stack
    const findTechStack = await TechStack.find({ _id: { $in: data.departmentTechStack } });

    if (checkArray(data.departmentTechStack, findTechStack) === false) {
      return {
        status: 400,
        message: FIND_TECH_STACK_FAILED,
      };
    }

    //Find project
    const findProject = await Project.find({ _id: { $in: data.departmentProject } });
    if (checkArray(data.departmentProject, findProject) === false) {
      return {
        status: 400,
        message: FIND_PROJECT_FAILED,
      };
    }

    //Find employee
    const findEmployee = await Employee.find({ _id: { $in: data.departmentEmployee } });
    if (checkArray(data.departmentEmployee, findEmployee) === false) {
      return {
        status: 400,
        message: FIND_EMPLOYEE_FAILED,
      };
    }

    //Create Department
    const createDepartment = await Department.create(data);

    return {
      status: 200,
      message: CREATE_DEPARTMENT_SUCCESS,
      data: createDepartment,
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
const findDepartmentByName = async (data, page, limit) => {
  try {
    if (!data.departmentName) {
      return {
        status: 400,
        message: DEPARTMENT_INPUT_INVALID,
      };
    }
    if (checkNumber(page)) {
      page = 1;
    }
    if (checkNumber(limit)) {
      limit = 10;
    }

    const findListDepartment = await Search(Department, 'departmentName', data.departmentName, page, limit);

    if (findListDepartment.length === 0) {
      return {
        status: 400,
        message: FIND_DEPARTMENT_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_DEPARTMENT_SUCCESS,
      data: findListDepartment,
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
const findOneDepartment = async (id) => {
  try {
    const findDepartment = await Department.findOne({ _id: id });
    if (!findDepartment) {
      return {
        status: 400,
        message: FIND_DEPARTMENT_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_DEPARTMENT_SUCCESS,
      data: findDepartment,
    };

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
const updateDepartment = async (id, data) => {
  try {
    const updateDepartment = await Department.findOneAndUpdate({ _id: id }, data);
    if (!updateDepartment) {
      return {
        status: 400,
        message: UPDATE_DEPARTMENT_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_DEPARTMENT_SUCCESS,
      data: updateDepartment,
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
const deleteDepartment = async (id) => {
  try {
    const deleteDepartment = await Department.findOneAndRemove({ _id: id });
    if (!deleteDepartment) {
      return {
        status: 400,
        message: DELETE_DEPARTMENT_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_DEPARTMENT_SUCCESS,
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
  createDepartment,
  findDepartmentByName,
  findOneDepartment,
  updateDepartment,
  deleteDepartment,
};