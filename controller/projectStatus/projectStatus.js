import ProjectStatus from '../../model/projectStatus.js';
import Project from '../../model/project.js';

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
  UPDATE_PROJECT_FAILED,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { checkStatus } from '../../helper/checkInput.js';
import { createErrorLog } from '../../helper/log.js';
//Create a status of project
const createProjectStatus = async (data) => {
  try {
    if (!data.projectStatusName) {
      return {
        status: 400,
        message: PROJECT_STATUS_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.projectStatusStatus)) {
      return {
        status: 400,
        message: PROJECT_STATUS_INPUT_INVALID,
      };
    }

    const findExistProjectStatus = await ProjectStatus.findOne({ projectStatusName: data.projectStatusName });

    if (findExistProjectStatus) {
      return {
        status: 400,
        message: PROJECT_STATUS_EXIST,
      };
    }

    const projectStatus = await ProjectStatus.create(data);

    return {
      status: 200,
      message: CREATE_PROJECT_STATUS_SUCCESS,
      data: projectStatus,
    };
  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find projects status by name
const findProjectStatusByName = async (data, page, limit) => {
  try {
    if (!data.projectStatusName) {
      return {
        status: 400,
        message: PROJECT_STATUS_INPUT_INVALID,
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListProjectStatus = await Search(ProjectStatus, 'projectStatusName', data.projectStatusName, page, limit);

    if (findListProjectStatus.length === 0) {
      return {
        status: 400,
        message: FIND_PROJECT_STATUS_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_PROJECT_STATUS_SUCCESS,
      data: findListProjectStatus,
    };

  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};


//Find ond project status by id
const findOneProjectStatus = async (id) => {
  try {
    const findProjectStatus = await ProjectStatus.findOne({ _id: id });
    if (!findProjectStatus) {
      return {
        status: 400,
        message: FIND_PROJECT_STATUS_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_PROJECT_STATUS_SUCCESS,
      data: findProjectStatus,
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

//Update project status
const updateProjectStatus = async (id, data) => {
  try {
    // if (!data.projectStatusName) {
    //   return {
    //     status: 400,
    //     message: PROJECT_STATUS_INPUT_INVALID,
    //   };
    // }

    // if (!checkStatus(data.projectStatusStatus)) {
    //   return {
    //     status: 400,
    //     message: PROJECT_STATUS_INPUT_INVALID,
    //   };
    // }
    const projectStatus = await ProjectStatus.findOneAndUpdate({ _id: id }, data);
    if (!projectStatus) {
      return {
        status: 400,
        message: UPDATE_PROJECT_STATUS_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_PROJECT_STATUS_SUCCESS,
      data: projectStatus,
    };

  } catch (error) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Delete project status
const deleteProjectStatus = async (id) => {
  try {
    const findProject = await Project.find({ projectStatus: id });
    if (findProject.length !== 0) {
      const updateProject = await Project.updateOne({ projectStatus: id }, { projectStatus: null });
      if (updateProject.n === 0) {
        return {
          status: 400,
          message: UPDATE_PROJECT_FAILED,
        };
      }
    }

    const projectStatus = await ProjectStatus.findOneAndRemove({ _id: id });
    if (!projectStatus) {
      return {
        status: 400,
        message: DELETE_PROJECT_STATUS_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_PROJECT_STATUS_SUCCESS,
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
  createProjectStatus,
  findProjectStatusByName,
  findOneProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
};