import Project from '../../model/project.js';
import {
  PROJECT_EXIST,
  CREATE_PROJECT_SUCCESS,
  PROJECT_INPUT_INVALID,
  FIND_PROJECT_FAILED,
  FIND_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILED,
  DELETE_PROJECT_SUCCESS,
  SERVER_ERROR,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';

//Create a kind of project
const createProject = async (data) => {
  try {
    if (!data.projectName || !data.projectKindId || !data.projectStatusId || !data.techStackId || !data.employeeId ) {
      return {
        status: 400,
        code: PROJECT_INPUT_INVALID,
        message: 'Missing project profile',
      };
    }

    const findExistProject = await Project.findOne({ projectName: data.projectName });
    if (findExistProject !== null) {
      return {
        status: 400,
        code: PROJECT_EXIST,
        message: 'Project kind exist',
      };
    }

    const createProject = await Project.create(data);

    return {
      status: 200,
      code: CREATE_PROJECT_SUCCESS,
      message: 'Create project kind success',
      data: createProject,
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
const findProjectByName = async (data, page, limit) => {
  try {
    if (!data.projectName) {
      return {
        status: 400,
        code: PROJECT_INPUT_INVALID,
        message: 'Project kind name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListProject = await Search(Project, 'projectName', data.projectName, page, limit);

    if (typeof findListProject === 'undefined') {
      return {
        status: 400,
        code: FIND_PROJECT_FAILED,
        message: 'Project kind not found',
      };
    }

    return {
      status: 200,
      code: UPDATE_PROJECT_SUCCESS,
      message: 'Find project kind success',
      data: findListProject,
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
const findOneProject = async (id) => {
  try {
    const findProject = await Project.findOne({ _id: id });
    if (typeof findProject === 'undefined') {
      return {
        status: 400,
        code: FIND_PROJECT_FAILED,
        message: 'Project kind not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_PROJECT_SUCCESS,
        message: 'Find project kind success',
        data: findProject,
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
const updateProject = async (id, data) => {
  try {
    if (!data.projectName) {
      return {
        status: 400,
        code: PROJECT_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }
    let updateProject = await Project.findOneAndUpdate({ _id: id }, data);
    if (!updateProject) {
      return {
        status: 400,
        code: UPDATE_PROJECT_FAILED,
        message: 'Update project kind failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_PROJECT_SUCCESS,
        message: 'update project kind success',
        data: updateProject,
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
const deleteProject = async (id) => {
  try {
    let user = await Project.findOneAndRemove({ _id: id });
    if (!user) {
      return {
        status: 400,
        code: DELETE_PROJECT_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_PROJECT_SUCCESS,
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
  createProject,
  findProjectByName,
  findOneProject,
  updateProject,
  deleteProject,
};