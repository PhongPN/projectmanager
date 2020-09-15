import jwt from 'jsonwebtoken';
import crypto from 'crypto';

//Generate token
export const generateToken = async (data) => {
  const result = await jwt.sign(data, process.env.TOKEN_SECRETKEY, { expiresIn: process.env.TOKEN_LIFE });

  return result;
};

export const generateResetToken = () => {
  const tokenLength = 8;
  let expriredTime = new Date;
  expriredTime.setMinutes(expriredTime.getMinutes() + 1000);

  return {
    resetToken: crypto.randomBytes(Math.ceil(tokenLength / 2)).toString('hex').slice(0, tokenLength),
    resetTokenExpired: expriredTime,
  };
};
