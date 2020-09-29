import TechStack from '../../model/techStack.js';

import {
  SERVER_ERROR,
  TECH_STACK_INPUT_INVALID,
  TECH_STACK_EXIST,
  CREATE_TECH_STACK_SUCCESS,
  FIND_TECH_STACK_FAILED,
  FIND_TECH_STACK_SUCCESS,
  UPDATE_TECH_STACK_FAILED,
  UPDATE_TECH_STACK_SUCCESS,
  DELETE_TECH_STACK_FAILED,
  DELETE_TECH_STACK_SUCCESS,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { checkStatus } from '../../helper/checkInput.js';
import { createErrorLog } from '../../helper/log.js';
//Create a tech stack of project
const createTechStack = async (data) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        message: TECH_STACK_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.techStackStatus)) {
      return {
        status: 400,
        message: TECH_STACK_INPUT_INVALID,
      };
    }

    const findExistTechStack = await TechStack.findOne({ techStackName: data.techStackName });
    if (findExistTechStack) {
      return {
        status: 400,
        message: TECH_STACK_EXIST,
      };
    }

    const techStack = await TechStack.create(data);

    return {
      status: 200,
      message: CREATE_TECH_STACK_SUCCESS,
      data: techStack,
    };
  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find projects tech stack by name
const findTechStackByName = async (data, page, limit) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        message: TECH_STACK_INPUT_INVALID,
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListTechStack = await Search(TechStack, 'techStackName', data.techStackName, page, limit);

    if (!findListTechStack) {
      return {
        status: 400,
        message: FIND_TECH_STACK_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_TECH_STACK_SUCCESS,
      data: findListTechStack,
    };

  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};


//Find ond tech stack by id
const findOneTechStack = async (id) => {
  try {
    const findTechStack = await TechStack.findOne({ _id: id });
    if (!findTechStack) {
      return {
        status: 400,
        message: FIND_TECH_STACK_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_TECH_STACK_SUCCESS,
      data: findTechStack,
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

//Get all tech stack

const getTechStack = async () => {
  try {
    const getTechStack = await TechStack.find({});
    if (getTechStack) {
      console.log(getTechStack);
    }
  } catch (error) {
    return {
      err: error,
    };
  }
};

//Update tech stack
const updateTechStack = async (id, data) => {
  try {
    if (!data.techStackName) {
      return {
        status: 400,
        message: TECH_STACK_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.techStackStatus)) {
      return {
        status: 400,
        message: TECH_STACK_INPUT_INVALID,
      };
    }

    const techStack = await TechStack.findOneAndUpdate({ _id: id }, data);
    if (!techStack) {
      return {
        status: 400,
        message: UPDATE_TECH_STACK_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_TECH_STACK_SUCCESS,
      data: techStack,
    };

  } catch (error) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Delete tech stack
const deleteTechStack = async (id) => {
  try {
    const techStack = await TechStack.findOneAndRemove({ _id: id });
    if (!techStack) {
      return {
        status: 400,
        message: DELETE_TECH_STACK_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_TECH_STACK_SUCCESS,
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
  createTechStack,
  findTechStackByName,
  findOneTechStack,
  updateTechStack,
  deleteTechStack,
  getTechStack,
};