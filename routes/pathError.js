const NOT_FOUND = 404;

const pathError = (req,res) => {
  res.status(NOT_FOUND).send({ message: 'Запросы по указанным параметрам не подлежат обработке' });
};

module.exports = pathError;