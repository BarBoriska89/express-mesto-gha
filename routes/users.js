const userRouter = require('express').Router();

const {
  getUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  updateUserValidation, updateAvatarValidation, getUserValidation,
} = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidation, updateUser);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserValidation, getUser);

module.exports = userRouter;
