import ProjectKind from '../../model/projectKind.js';
import Project from '../../model/project.js';
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
  UPDATE_PROJECT_FAILED,
  SERVER_ERROR,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { checkStatus, checkNumber } from '../../helper/checkInput.js';
import { createErrorLog, createSuccessLog } from '../../helper/log.js';

//Create a kind of project
const createProjectKind = async (data) => {
  try {
    if (!data.projectKindName || !checkNumber(data.projectKindKeyNumber)) {
      return {
        status: 400,
        message: PROJECT_KIND_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.projectKindStatus)) {
      return {
        status: 400,
        message: PROJECT_KIND_INPUT_INVALID,
      };
    }

    const findExistProjectKind = await ProjectKind.findOne({ projectKindName: data.projectKindName });
    if (findExistProjectKind) {
      return {
        status: 400,
        message: PROJECT_KIND_EXIST,
      };
    }

    const createProjectKind = await ProjectKind.create(data);
    createSuccessLog({ status: 200, message: CREATE_PROJECT_KIND_SUCCESS });

    return {
      status: 200,
      message: CREATE_PROJECT_KIND_SUCCESS,
      data: createProjectKind,
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
const findProjectKindByName = async (data, page, limit) => {
  try {
    if (!data.projectKindName) {
      return {
        status: 400,
        message: PROJECT_KIND_INPUT_INVALID,
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
        message: FIND_PROJECT_KIND_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_PROJECT_KIND_SUCCESS,
      data: findListProjectKind,
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
const findOneProjectKind = async (id) => {
  try {
    const findProjectKind = await ProjectKind.findOne({ _id: id });
    if (!findProjectKind) {
      return {
        status: 400,
        message: FIND_PROJECT_KIND_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_PROJECT_KIND_SUCCESS,
      data: findProjectKind,
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
const updateProjectKind = async (id, data) => {
  try {
    if (!data.projectKindName || !checkNumber(data.projectKindKeyNumber)) {
      return {
        status: 400,
        message: PROJECT_KIND_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.projectKindStatus)) {
      return {
        status: 400,
        message: PROJECT_KIND_INPUT_INVALID,
      };
    }
    const updateProjectKind = await ProjectKind.findOneAndUpdate({ _id: id }, data);
    if (!updateProjectKind) {
      return {
        status: 400,
        message: UPDATE_PROJECT_KIND_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_PROJECT_KIND_SUCCESS,
      data: updateProjectKind,
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
const deleteProjectKind = async (id) => {
  try {
    const updateProject = await Project.updateOne({ projectKind: id }, { projectKind: null });
    if (updateProject.n === 0) {
      return {
        status: 400,
        message: UPDATE_PROJECT_FAILED,
      };
    }

    const deleteProjectKind = await ProjectKind.findOneAndRemove({ _id: id });
    if (!deleteProjectKind) {
      return {
        status: 400,
        message: DELETE_PROJECT_KIND_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_PROJECT_KIND_SUCCESS,
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
  createProjectKind,
  findProjectKindByName,
  findOneProjectKind,
  updateProjectKind,
  deleteProjectKind,
};