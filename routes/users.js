const userRouter = require('express').Router();

const {createUser, getUsers, getUser, updateUser, updateAvatar} = require('../controllers/users');


userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:userId',getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;