const { ConflictError } = require('../errors/ConflictError');

const errorsMV = (err, req, res, next) => {
  console.log(`печать ошибки из милдвера${err.code}`);
  const { statusCode = 500, message } = err;
  if (statusCode === 500) {
    res.status(statusCode).send({ message: 'Ошибка по умолчанию' });
    return;
  }
  if (err.code === 11000) {
    console.log('gGGGG');
    res.status(ConflictError.statusCode).send({ message: 'Пользователь с таким Email уже создан.' });
    return;
  }
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorsMV };
