const mongoose = require('mongoose');
const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER = 500;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному _id ${userId} не найден. ` });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: `Пользователь по указанному _id ${userId} не найден. ` });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному _id ${userId} не найден. ` });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному _id ${userId} не найден. ` });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports = {
  createUser, getUsers, getUser, updateUser, updateAvatar,
};
