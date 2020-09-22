import Department from '../../model/department.js';
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
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';

//Create a kind of project
const createDepartment = async (data) => {
  try {
    if (!data.departmentName || !data.departmentResponsibility
      || !data.departmentTechStackId || !data.departmentProject || !data.departmentEmployee ) {
      return {
        status: 400,
        code: DEPARTMENT_INPUT_INVALID,
        message: 'Missing department profile',
      };
    }

    const findExistDepartment = await Department.findOne({ departmentName: data.departmentName });
    if (findExistDepartment !== null) {
      return {
        status: 400,
        code: DEPARTMENT_EXIST,
        message: 'Project kind exist',
      };
    }

    const createDepartment = await Department.create(data);

    return {
      status: 200,
      code: CREATE_DEPARTMENT_SUCCESS,
      message: 'Create project kind success',
      data: createDepartment,
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
const findDepartmentByName = async (data, page, limit) => {
  try {
    if (!data.departmentName) {
      return {
        status: 400,
        code: DEPARTMENT_INPUT_INVALID,
        message: 'Project kind name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListDepartment = await Search(Department, 'departmentName', data.departmentName, page, limit);

    if (typeof findListDepartment === 'undefined') {
      return {
        status: 400,
        code: FIND_DEPARTMENT_FAILED,
        message: 'Project kind not found',
      };
    }

    return {
      status: 200,
      code: UPDATE_DEPARTMENT_SUCCESS,
      message: 'Find project kind success',
      data: findListDepartment,
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
const findOneDepartment = async (id) => {
  try {
    const findDepartment = await Department.findOne({ _id: id });
    if (typeof findDepartment === 'undefined') {
      return {
        status: 400,
        code: FIND_DEPARTMENT_FAILED,
        message: 'Project kind not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_DEPARTMENT_SUCCESS,
        message: 'Find project kind success',
        data: findDepartment,
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
const updateDepartment = async (id, data) => {
  try {
    if (!data.departmentName || !data.departmentResponsibility
      || !data.departmentTechStackId || !data.departmentProject || !data.departmentEmployee ){
      return {
        status: 400,
        code: DEPARTMENT_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }
    let updateDepartment = await Department.findOneAndUpdate({ _id: id }, data);
    if (!updateDepartment) {
      return {
        status: 400,
        code: UPDATE_DEPARTMENT_FAILED,
        message: 'Update project kind failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_DEPARTMENT_SUCCESS,
        message: 'update project kind success',
        data: updateDepartment,
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
const deleteDepartment = async (id) => {
  try {
    let user = await Department.findOneAndRemove({ _id: id });
    if (!user) {
      return {
        status: 400,
        code: DELETE_DEPARTMENT_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_DEPARTMENT_SUCCESS,
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
  createDepartment,
  findDepartmentByName,
  findOneDepartment,
  updateDepartment,
  deleteDepartment,
};