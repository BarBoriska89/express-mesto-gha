const errorsMV = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким Email уже создан.' });
    return;
  }
  if (statusCode === 500) {
    res.status(statusCode).send({ message: 'Ошибка по умолчанию' });
    return;
  }
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorsMV };
