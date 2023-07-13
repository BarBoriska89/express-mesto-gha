const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const pathError = require('./pathError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use(pathError);

module.exports = router;
