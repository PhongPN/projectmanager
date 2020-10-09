import TechStack from '../../model/techStack.js';
import Employee from '../../model/employee.js';
import Department from '../../model/department.js';
import Project from '../../model/project.js';
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
  UPDATE_PROJECT_FAILED,
  UPDATE_DEPARTMENT_FAILED,
  UPDATE_EMPLOYEE_FAILED,
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

    if (findListTechStack.length === 0) {
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

// const getTechStack = async () => {
//   try {
//     const getTechStack = await TechStack.find({});
//     if (getTechStack) {
//       console.log(getTechStack);
//     }
//   } catch (error) {
//     return {
//       err: error,
//     };
//   }
// };

//Update tech stack
const updateTechStack = async (id, data) => {
  try {
    const techStack = await TechStack.findOneAndUpdate({ _id: id }, data, { overwrite: true });

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
    const findEmployee = await Employee.find({ 'employeeTechStack.techStackId': id });
    if (findEmployee.length !== 0) {
      const updateEmployee = await Employee.updateOne({ 'employeeTechStack.techStackId': id }, { $pull: { employeeTechStack: { techStackId: id } } });
      if (updateEmployee.n === 0) {
        return {
          status: 400,
          message: UPDATE_EMPLOYEE_FAILED,
        };
      }
    }

    const findDepartment = await Department.find({ departmentTechStack: id });
    if (findDepartment.length !== 0) {
      const updateDepartment = await Department.updateOne({ departmentTechStack: id }, { $pull: { departmentTechStack: id } });
      if (updateDepartment.n === 0) {
        return {
          status: 400,
          message: UPDATE_DEPARTMENT_FAILED,
        };
      }
    }

    const findProject = await Project.find({ projectTeckStack: id });
    if (findProject.length !== 0) {
      const updateProject = await Project.updateOne({ projectTeckStack: id }, { $pull: { projectTeckStack: id } });
      if (updateProject.n === 0) {
        return {
          status: 400,
          message: UPDATE_PROJECT_FAILED,
        };
      }
    }

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
  } catch (err) {
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
  // getTechStack,
};