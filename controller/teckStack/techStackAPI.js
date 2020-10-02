import {
  createTechStack,
  findOneTechStack,
  findTechStackByName,
  // getTechStack,
  updateTechStack,
  deleteTechStack,
} from './teckStack.js';

export const createTechStackAPI = async (req, res) => {
  try {
    const result = await createTechStack(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findOneTechStackAPI = async (req, res) => {
  try {
    const result = await findOneTechStack(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const findTechStackByNameAPI = async (req, res) => {
  try {
    const result = await findTechStackByName(req.body, req.query.page, req.query.limit);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

// export const getTechStackAPI = async (req, res) => {
//   try {
//     const result = await getTechStack();
//     res.status(result.status).json(result);
//   } catch (err) {
//     res.status(err.status).json(err);
//   }
// };

export const updateTechStackAPI = async (req, res) => {
  try {
    const result = await updateTechStack(req.params.id, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};

export const deleteTechStackAPI = async (req, res) => {
  try {
    const result = await deleteTechStack(req.params.id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.status).json(err);
  }
};