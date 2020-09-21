import TechStack from '../../model/techStack.js';

import {
  SERVER_ERROR,
  TECH_STACK_EXIST,
  TECH_STACK_INPUT_INVALID,
  CREATE_TECH_STACK_SUCCESS,
  FIND_TECH_STACK_SUCCESS,
  FIND_TECH_STACK_FAILED,
  UPDATE_TECH_STACK_SUCCESS,
  UPDATE_TECH_STACK_FAILED,
  DELETE_TECH_STACK_SUCCESS,
  DELETE_TECH_STACK_FAILED,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
//Create a status of project
const createTechStack = async (data) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        code: TECH_STACK_INPUT_INVALID,
        message: 'Missing user group name',
      };
    }

    if (data.techStackStatus !== 'active' && data.techStackStatus !== 'inactive') {
      return {
        status: 400,
        code: TECH_STACK_INPUT_INVALID,
        message: 'User group status invalid',
      };
    }

    const findExistTechStack = await TechStack.findOne({ techStackName: data.techStackName });
    if (findExistTechStack !== null) {
      return {
        status: 400,
        code: TECH_STACK_EXIST,
        message: 'User group exist',
      };
    }

    const techStack = await TechStack.create(data);

    return {
      status: 200,
      code: CREATE_TECH_STACK_SUCCESS,
      message: 'Create user group success',
      data: techStack,
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
const findTechStackByName = async (data, page, limit) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        code: TECH_STACK_INPUT_INVALID,
        message: 'User group name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListTechStack = await Search(TechStack, 'techStackName', data.techStackName, page, limit);

    if (typeof findListTechStack === 'undefined') {
      return {
        status: 400,
        code: FIND_TECH_STACK_FAILED,
        message: 'User group not found',
      };
    }

    return {
      status: 200,
      code: FIND_TECH_STACK_SUCCESS,
      message: 'Find user group success',
      data: findListTechStack,
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
const findOneTechStack = async (id) => {
  try {
    const findTechStack = await TechStack.findOne({ _id: id });
    if (typeof findTechStack === 'undefined') {
      return {
        status: 400,
        code: FIND_TECH_STACK_FAILED,
        message: 'User group not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_TECH_STACK_SUCCESS,
        message: 'Find user group success',
        data: findTechStack,
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
const updateTechStack = async (id, data) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        code: TECH_STACK_INPUT_INVALID,
        message: 'Missing user group profile',
      };
    }

    if (data.techStackStatus !== 'active' && data.techStackStatus !== 'inactive') {
      return {
        status: 400,
        code: TECH_STACK_INPUT_INVALID,
        message: 'User group status invalid',
      };
    }
    let techStack = await TechStack.findOneAndUpdate({ _id: id }, data);

    if (!techStack) {
      return {
        status: 400,
        code: UPDATE_TECH_STACK_FAILED,
        message: 'Update user group failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_TECH_STACK_SUCCESS,
        message: 'update user group success',
        data: techStack,
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
const deleteTechStack = async (id) => {
  try {
    let techStack = await TechStack.findOneAndRemove({ _id: id });
    if (!techStack) {
      return {
        status: 400,
        code: DELETE_TECH_STACK_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_TECH_STACK_SUCCESS,
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
  createTechStack,
  findTechStackByName,
  findOneTechStack,
  updateTechStack,
  deleteTechStack,
};