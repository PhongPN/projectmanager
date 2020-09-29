import Project from '../../model/project.js';
import TechStack from '../../model/techStack.js';
import ProjectKind from '../../model/projectKind.js';
import ProjectStatus from '../../model/projectStatus.js';
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
  FIND_TECH_STACK_FAILED,
  FIND_PROJECT_KIND_FAILED,
  FIND_PROJECT_STATUS_FAILED,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { createErrorLog } from '../../helper/log.js';
import { checkNull, checkArray, checkNumber } from '../../helper/checkInput.js';

//Create a kind of project
const createProject = async (data) => {
  try {

    //Check input null
    if (checkNull(data.projectName, data.projectKind, data.projectStatus, data.projectTeckStack, data.projectEmployee) === true) {
      return {
        status: 400,
        message: PROJECT_INPUT_INVALID,
      };
    }

    //Find exist project
    const findExistProject = await Project.findOne({ projectName: data.projectName });
    if (findExistProject) {
      return {
        status: 400,
        message: PROJECT_EXIST,
      };
    }

    //Find tech stack
    const findTechStack = await TechStack.find({ _id: { $in: data.projectTeckStack } });

    if (checkArray(data.projectTeckStack, findTechStack) === false) {
      return {
        status: 400,
        message: FIND_TECH_STACK_FAILED,
      };
    }

    //Find project kind
    const findProjectKind = await ProjectKind.find({ _id: data.projectKind });

    if (!findProjectKind) {
      return {
        status: 400,
        message: FIND_PROJECT_KIND_FAILED,
      };
    }

    //Find project kind
    const findProjectStatus = await ProjectStatus.find({ _id: data.projectStatus });

    if (!findProjectStatus) {
      return {
        status: 400,
        message: FIND_PROJECT_STATUS_FAILED,
      };
    }

    //Crete Project
    const createProject = await Project.create(data);

    return {
      status: 200,
      message: CREATE_PROJECT_SUCCESS,
      data: createProject,
    };
  } catch (err) {
    createErrorLog({ status: 500, SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find projects kind by name
const findProjectByName = async (data, page, limit) => {
  try {
    if (!data.projectName) {
      return {
        status: 400,
        message: PROJECT_INPUT_INVALID,
      };
    }
    if (checkNumber(page) === false) {
      page = 1;
    }
    if (checkNumber(limit) === false) {
      limit = 10;
    }

    const findListProject = await Search(Project, 'projectName', data.projectName, page, limit);

    if (!findListProject) {
      return {
        status: 400,
        message: FIND_PROJECT_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_PROJECT_SUCCESS,
      data: findListProject,
    };

  } catch (err) {
    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find ond project kind by id
const findOneProject = async (id) => {
  try {
    const findProject = await Project.findOne({ _id: id });
    if (!findProject) {
      return {
        status: 400,
        message: FIND_PROJECT_FAILED,
      };
    }
    else {
      return {
        status: 200,
        message: FIND_PROJECT_SUCCESS,
        data: findProject,
      };
    }
  }
  catch (err) {
    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Update project kind
const updateProject = async (id, data) => {
  try {
    const updateProject = await Project.findOneAndUpdate({ _id: id }, data);
    if (!updateProject) {
      return {
        status: 400,
        message: UPDATE_PROJECT_FAILED,
      };
    } else {
      return {
        status: 200,
        message: UPDATE_PROJECT_SUCCESS,
        data: updateProject,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Delete project kind
const deleteProject = async (id) => {
  try {
    const deleteProject = await Project.findOneAndRemove({ _id: id });
    if (!deleteProject) {
      return {
        status: 400,
        message: DELETE_PROJECT_FAILED,
      };
    } else {
      return {
        status: 200,
        message: DELETE_PROJECT_SUCCESS,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: SERVER_ERROR,
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