const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'bigsecret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  console.log('Вы авторизированы!');
  next();
};

module.exports = { auth };
