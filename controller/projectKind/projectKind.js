import ProjectKind from '../../model/projectKind.js';
import {
  PROJECT_KIND_EXIST,
  CREATE_PROJECT_KIND_SUCCESS,
  PROJECT_KIND_INPUT_INVALID,
  FIND_PROJECT_KIND_FAILED,
  FIND_PROJECT_KIND_SUCCESS,
  UPDATE_PROJECT_KIND_FAILED,
  UPDATE_PROJECT_KIND_SUCCESS,
  DELETE_PROJECT_KIND_FAILED,
  DELETE_PROJECT_KIND_SUCCESS,
  SERVER_ERROR,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';

//Create a kind of project
const createProjectKind = async (data) => {
  try {
    if (!data.projectKindName || !data.projectKindKeyNumber) {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }

    // [].includes()
    if (data.projectKindStatus !== 'active' && data.projectKindStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Project kind status invalid',
      };
    }

    const findExistProjectKind = await ProjectKind.findOne({ projectKindName: data.projectKindName });
    if (!findExistProjectKind) {
      return {
        status: 400,
        code: PROJECT_KIND_EXIST,
        message: 'Project kind exist',
      };
    }

    const createProjectKind = await ProjectKind.create(data);

    return {
      status: 200,
      code: CREATE_PROJECT_KIND_SUCCESS,
      message: 'Create project kind success',
      data: createProjectKind,
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
const findProjectKindByName = async (data, page, limit) => {
  try {
    if (!data.projectKindName) {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Project kind name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListProjectKind = await Search(ProjectKind, 'projectKindName', data.projectKindName, page, limit);

    if (!findListProjectKind) {
      return {
        status: 400,
        code: FIND_PROJECT_KIND_FAILED,
        message: 'Project kind not found',
      };
    }

    return {
      status: 200,
      code: FIND_PROJECT_KIND_SUCCESS,
      message: 'Find project kind success',
      data: findListProjectKind,
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
const findOneProjectKind = async (id) => {
  try {
    const findProjectKind = await ProjectKind.findOne({ _id: id });
    if (!findProjectKind) {
      return {
        status: 400,
        code: FIND_PROJECT_KIND_FAILED,
        message: 'Project kind not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_PROJECT_KIND_SUCCESS,
        message: 'Find project kind success',
        data: findProjectKind,
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
const updateProjectKind = async (id, data) => {
  try {
    if (!data.projectKindName || !data.projectKindKeyNumber) {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }

    if (data.projectKindStatus !== 'active' && data.projectKindStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Project kind status invalid',
      };
    }
    const updateProjectKind = await ProjectKind.findOneAndUpdate({ _id: id }, data);
    if (!updateProjectKind) {
      return {
        status: 400,
        code: UPDATE_PROJECT_KIND_FAILED,
        message: 'Update project kind failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_PROJECT_KIND_SUCCESS,
        message: 'update project kind success',
        data: updateProjectKind,
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
const deleteProjectKind = async (id) => {
  try {
    const deleteProjectKind = await ProjectKind.findOneAndRemove({ _id: id });
    if (!deleteProjectKind) {
      return {
        status: 400,
        code: DELETE_PROJECT_KIND_FAILED,
        message: 'Delete project kind failed',
      };
    }

    return {
      status: 200,
      code: DELETE_PROJECT_KIND_SUCCESS,
      message: 'Delete project kind success',
    };
  } catch (error) {
    return {
      status: 500,
      code: SERVER_ERROR,
      message: 'Server error',
    };
  }
};

export {
  createProjectKind,
  findProjectKindByName,
  findOneProjectKind,
  updateProjectKind,
  deleteProjectKind,
};