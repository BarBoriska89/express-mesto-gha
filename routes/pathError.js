const NotFound = require('../errors/NotFound');

const pathError = (req, res, next) => {
  next(new NotFound('Запросы по указанным параметрам не подлежат обработке'));
};

module.exports = pathError;
