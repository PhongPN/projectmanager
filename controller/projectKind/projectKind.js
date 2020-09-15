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

//Create a kind of project
const createProjectKind = async (newProjectKind) => {
  try {
    if (!newProjectKind.projectKindName || !newProjectKind.projectKindKeyNumber) {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Missing project kind profile',
      };
    }

    if (newProjectKind.projectKindStatus !== 'active' || newProjectKind.projectKindStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Project kind status invalid',
      };
    }

    const findExistProjectKind = await ProjectKind.findOne({ projectKindName: newProjectKind.projectKindName });
    if (findExistProjectKind !== null) {
      return {
        status: 400,
        code: PROJECT_KIND_EXIST,
        message: 'Project kind exist',
      };
    }

    const projectKind = await ProjectKind.create(newProjectKind);

    return {
      status: 200,
      code: CREATE_PROJECT_KIND_SUCCESS,
      message: 'Create project kind success',
      data: projectKind,
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
const findProjectKindByName = async (projectKindName, page, limit) => {
  try {
    if (!projectKindName) {
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

    const findListUser = (() => {
      let start = (page - 1) * limit;
      let end = page * limit;
      const result = ProjectKind.find({ 'projectKindName': { $regex: `.*${projectKindName}.*`, $options: 'i' } }, 'projectKindName')
        .skip(start)
        .limit(end);

      return result;
    });

    if (typeof findListUser === 'undefined') {
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
      data: findListUser,
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
    if (typeof findOndUser === 'undefined') {
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

    if (data.projectKindStatus !== 'active' || data.projectKindStatus !== 'inactive') {
      return {
        status: 400,
        code: PROJECT_KIND_INPUT_INVALID,
        message: 'Project kind status invalid',
      };
    }
    let projectKind = await ProjectKind.findOneAndUpdate({ _id: id }, data);
    if (!projectKind) {
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
        data: projectKind,
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
    let user = await ProjectKind.findOneAndRemove({ _id: id });
    if (!user) {
      return {
        status: 400,
        code: DELETE_PROJECT_KIND_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_PROJECT_KIND_SUCCESS,
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
  createProjectKind,
  findProjectKindByName,
  findOneProjectKind,
  updateProjectKind,
  deleteProjectKind,
};