import jwt from 'jsonwebtoken';

//Generate token
export const generateToken = async (data) => {

  const result = await jwt.sign({ data }, process.env.TOKEN_SECRETKEY, { expiresIn: process.env.TOKEN_LIFE });

  return result;
};
