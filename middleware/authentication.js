import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(403);
  }

  req.token = authorization.split(' ')[1];

  jwt.verify(req.token, process.env.TOKEN_SECRETKEY, (err /*, authData*/) => {
    if (err) {
      res.status(403).send(err);
    }
    else {
      next();
    }
  });
};