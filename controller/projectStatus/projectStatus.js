import ProjectStatus from '../../model/projectStatus.js';

import {
  SERVER_ERROR,
  PROJECT_STATUS_INPUT_INVALID,
  PROJECT_STATUS_EXIST,
  CREATE_PROJECT_STATUS_SUCCESS,
  FIND_PROJECT_STATUS_FAILED,
  FIND_PROJECT_STATUS_SUCCESS,
  UPDATE_PROJECT_STATUS_FAILED,
  UPDATE_PROJECT_STATUS_SUCCESS,
  DELETE_PROJECT_STATUS_FAILED,
  DELETE_PROJECT_STATUS_SUCCESS,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
//Create a status of project
const createProjectStatus = async (data) => {
  try {
    if (!data.projectStatusName) {
      return {
        status: 400,
        code: PROJECT_STATUS_INPUT_INVALID,
        message: 'Missing project status name',
      };
    }

    if (data.projectStatusStatus !== 'active' && data.projectStatusStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_STATUS_INPUT_INVALID,
        message: 'Project status status invalid',
      };
    }

    const findExistProjectStatus = await ProjectStatus.findOne({ projectStatusName: data.projectStatusName });
    if (findExistProjectStatus !== null) {
      return {
        status: 400,
        code: PROJECT_STATUS_EXIST,
        message: 'Project status exist',
      };
    }

    const projectStatus = await ProjectStatus.create(data);

    return {
      status: 200,
      code: CREATE_PROJECT_STATUS_SUCCESS,
      message: 'Create project status success',
      data: projectStatus,
    };
  } catch (err) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

//Find projects status by name
const findProjectStatusByName = async (data, page, limit) => {
  try {
    if (!data.projectStatusName) {
      return {
        status: 400,
        code: PROJECT_STATUS_INPUT_INVALID,
        message: 'Project kind name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListProjectStatus = await Search(ProjectStatus, 'projectStatusName', data.projectStatusName, page, limit);

    if (typeof findListProjectStatus === 'undefined') {
      return {
        status: 400,
        code: FIND_PROJECT_STATUS_FAILED,
        message: 'Project kind not found',
      };
    }

    return {
      status: 200,
      code: FIND_PROJECT_STATUS_SUCCESS,
      message: 'Find project kind success',
      data: findListProjectStatus,
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
const findOneProjectStatus= async (id) => {
  try {
    const findProjectStatus= await ProjectStatus.findOne({ _id: id });
    if (typeof findProjectStatus === 'undefined') {
      return {
        status: 400,
        code: FIND_PROJECT_STATUS_FAILED,
        message: 'Project status not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_PROJECT_STATUS_SUCCESS,
        message: 'Find project status success',
        data: findProjectStatus,
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
const updateProjectStatus = async (id, data) => {
  try {
    if (!data.projectStatusName) {
      return {
        status: 400,
        code: PROJECT_STATUS_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }

    if (data.projectStatusStatus !== 'active' && data.projectStatusStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_STATUS_INPUT_INVALID,
        message: 'Project kind status invalid',
      };
    }
    let projectStatus = await ProjectStatus.findOneAndUpdate({ _id: id }, data);
    if (!projectStatus) {
      return {
        status: 400,
        code: UPDATE_PROJECT_STATUS_FAILED,
        message: 'Update project status failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_PROJECT_STATUS_SUCCESS,
        message: 'update project status success',
        data: projectStatus,
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
const deleteProjectStatus = async (id) => {
  try {
    let projectStatus = await ProjectStatus.findOneAndRemove({ _id: id });
    if (!projectStatus) {
      return {
        status: 400,
        code: DELETE_PROJECT_STATUS_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_PROJECT_STATUS_SUCCESS,
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
  createProjectStatus,
  findProjectStatusByName,
  findOneProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
};