const errorsMV = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка по умолчанию'
      : message,
  });
};

module.exports = { errorsMV };
