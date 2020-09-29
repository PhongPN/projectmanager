import UserGroup from '../../model/userGroup.js';
import {
  USER_GROUP_EXIST,
  CREATE_USER_GROUP_SUCCESS,
  USER_GROUP_INPUT_INVALID,
  FIND_USER_GROUP_FAILED,
  FIND_USER_GROUP_SUCCESS,
  UPDATE_USER_GROUP_FAILED,
  UPDATE_USER_GROUP_SUCCESS,
  DELETE_USER_GROUP_FAILED,
  DELETE_USER_GROUP_SUCCESS,
  SERVER_ERROR,
} from '../../status/status.js';

import { Search } from '../../middleware/fuzzySearch.js';
import { checkStatus, checkNumber } from '../../helper/checkInput.js';
import { createErrorLog, createSuccessLog } from '../../helper/log.js';

//Create a user group
const createUserGroup = async (data) => {
  try {
    if (!data.userGroupName || !checkNumber(data.userGroupKeyNumber)) {
      return {
        status: 400,
        message: USER_GROUP_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.userGroupStatus)) {
      return {
        status: 400,
        message: USER_GROUP_INPUT_INVALID,
      };
    }

    const findExistUserGroup = await UserGroup.findOne({ userGroupName: data.userGroupName });
    if (findExistUserGroup) {
      return {
        status: 400,
        message: USER_GROUP_EXIST,
      };
    }

    const createUserGroup = await UserGroup.create(data);
    createSuccessLog({ status: 200, message: CREATE_USER_GROUP_SUCCESS });

    return {
      status: 200,
      message: CREATE_USER_GROUP_SUCCESS,
      data: createUserGroup,
    };
  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find user group by name
const findUserGroupByName = async (data, page, limit) => {
  try {
    if (!data.userGroupName) {
      return {
        status: 400,
        message: USER_GROUP_INPUT_INVALID,
      };
    }
    if (typeof (page) !== Number) {
      page = 1;
    }
    if (typeof (limit) !== Number) {
      limit = 10;
    }

    const findListUserGroup = await Search(UserGroup, 'userGroupName', data.userGroupName, page, limit);

    if (!findListUserGroup) {
      return {
        status: 400,
        message: FIND_USER_GROUP_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_USER_GROUP_SUCCESS,
      data: findListUserGroup,
    };

  } catch (err) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Find ond user group by id
const findOneUserGroup = async (id) => {
  try {
    const findUserGroup = await UserGroup.findOne({ _id: id });
    if (!findUserGroup) {
      return {
        status: 400,
        message: FIND_USER_GROUP_FAILED,
      };
    }

    return {
      status: 200,
      message: FIND_USER_GROUP_SUCCESS,
      data: findUserGroup,
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

//Update user group
const updateUserGroup = async (id, data) => {
  try {
    if (!data.userGroupName || !checkNumber(data.userGroupKeyNumber)) {
      return {
        status: 400,
        message: USER_GROUP_INPUT_INVALID,
      };
    }

    if (!checkStatus(data.userGroupStatus)) {
      return {
        status: 400,
        message: USER_GROUP_INPUT_INVALID,
      };
    }
    const updateUserGroup = await UserGroup.findOneAndUpdate({ _id: id }, data);
    if (!updateUserGroup) {
      return {
        status: 400,
        message: UPDATE_USER_GROUP_FAILED,
      };
    }

    return {
      status: 200,
      message: UPDATE_USER_GROUP_SUCCESS,
      data: updateUserGroup,
    };
  } catch (error) {
    createErrorLog({ status: 500, message: SERVER_ERROR });

    return {
      status: 500,
      message: SERVER_ERROR,
    };
  }
};

//Delete user group
const deleteUserGroup = async (id) => {
  try {
    const deleteUserGroup = await UserGroup.findOneAndRemove({ _id: id });
    if (!deleteUserGroup) {
      return {
        status: 400,
        message: DELETE_USER_GROUP_FAILED,
      };
    }

    return {
      status: 200,
      message: DELETE_USER_GROUP_SUCCESS,
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
  createUserGroup,
  findUserGroupByName,
  findOneUserGroup,
  updateUserGroup,
  deleteUserGroup,
};