import UserGroup from '../../model/userGroup.js';

import {
  SERVER_ERROR,
  USER_GROUP_EXIST,
  USER_GROUP_INPUT_INVALID,
  CREATE_USER_GROUP_SUCCESS,
  FIND_USER_GROUP_FAILED,
  FIND_USER_GROUP_SUCCESS,
  UPDATE_USER_GROUP_FAILED,
  UPDATE_USER_GROUP_SUCCESS,
  DELETE_USER_GROUP_FAILED,
  DELETE_USER_GROUP_SUCCESS,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
//Create a status of project
const createUserGroup = async (data) => {
  try {
    if (!data.userGroupName || !data.projectKindKeyNumber) {
      return {
        status: 400,
        code: USER_GROUP_INPUT_INVALID,
        message: 'Missing user group name',
      };
    }

    if (data.userGroupStatus !== 'active' && data.userGroupStatus !== 'inactive') {
      return {
        status: 400,
        code: USER_GROUP_INPUT_INVALID,
        message: 'User group status invalid',
      };
    }

    const findExistUserGroup = await UserGroup.findOne({ userGroupName: data.userGroupName });
    if (findExistUserGroup !== null) {
      return {
        status: 400,
        code: USER_GROUP_EXIST,
        message: 'User group exist',
      };
    }

    const userGroup = await UserGroup.create(data);

    return {
      status: 200,
      code: CREATE_USER_GROUP_SUCCESS,
      message: 'Create user group success',
      data: userGroup,
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
const findUserGroupByName = async (data, page, limit) => {
  try {
    if (!data.userGroupName) {
      return {
        status: 400,
        code: USER_GROUP_INPUT_INVALID,
        message: 'User group name invalid',
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListUserGroup = await Search(UserGroup, 'userGroupName', data.userGroupName, page, limit);

    if (typeof findListUserGroup === 'undefined') {
      return {
        status: 400,
        code: FIND_USER_GROUP_FAILED,
        message: 'User group not found',
      };
    }

    return {
      status: 200,
      code: FIND_USER_GROUP_SUCCESS,
      message: 'Find user group success',
      data: findListUserGroup,
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
const findOneUserGroup = async (id) => {
  try {
    const findUserGroup = await UserGroup.findOne({ _id: id });
    if (typeof findUserGroup === 'undefined') {
      return {
        status: 400,
        code: FIND_USER_GROUP_FAILED,
        message: 'User group not found',
      };
    }
    else {
      return {
        status: 200,
        code: FIND_USER_GROUP_SUCCESS,
        message: 'Find user group success',
        data: findUserGroup,
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
const updateUserGroup = async (id, data) => {
  try {
    if (!data.userGroupName  || !data.projectKindKeyNumber) {
      return {
        status: 400,
        code: USER_GROUP_INPUT_INVALID,
        message: 'Missing user group profile',
      };
    }

    if (data.userGroupStatus !== 'active' && data.userGroupStatus !== 'inactive') {
      return {
        status: 400,
        code: USER_GROUP_INPUT_INVALID,
        message: 'User group status invalid',
      };
    }
    let userGroup = await UserGroup.findOneAndUpdate({ _id: id }, data);
    if (!userGroup) {
      return {
        status: 400,
        code: UPDATE_USER_GROUP_FAILED,
        message: 'Update user group failed',
      };
    } else {
      return {
        status: 200,
        code: UPDATE_USER_GROUP_SUCCESS,
        message: 'update user group success',
        data: userGroup,
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
const deleteUserGroup = async (id) => {
  try {
    let userGroup = await UserGroup.findOneAndRemove({ _id: id });
    if (!userGroup) {
      return {
        status: 400,
        code: DELETE_USER_GROUP_FAILED,
        message: 'Delete project kind failed',
      };
    } else {
      return {
        status: 200,
        code: DELETE_USER_GROUP_SUCCESS,
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
  createUserGroup,
  findUserGroupByName,
  findOneUserGroup,
  updateUserGroup,
  deleteUserGroup,
};