const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const SALT_ROUNDS = 10;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким Email уже создан.');
      }

      return bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name, about, avatar, email, hash,
        }))
        .then((newUser) => {
          res.send(newUser);
          console.log(newUser);
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new BadRequest(err.message));
            return;
          }
          next(err);
        });
    })
    .catch((err) => next(err));
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((next));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest(`Пользователь по указанному _id ${userId} не найден. `));
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  console.log(userId);
  console.log(req.user._id);

  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequest('Введите логин и пароль пользователя.');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, 'bigsecret', { expiresIn: '7d' });
      console.log(token);
      res.send({ token });
    })
    .catch((err) => {
      console.log(err.name);
      next(new AuthError('Неверный логин или пароль!'));
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.user._id);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest(`Пользователь по указанному _id ${userId} не найден. `));
      }
      next(err);
    });
};

module.exports = {
  createUser, getUsers, getUser, updateUser, updateAvatar, login, getCurrentUser,
};
