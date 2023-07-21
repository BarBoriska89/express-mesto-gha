const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const pathError = require('./pathError');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use(pathError);

module.exports = router;
