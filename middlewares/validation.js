const { celebrate, Joi } = require('celebrate');

const BadRequest = require('../errors/BadRequest');

const regex = /^((http|https):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    about: Joi.string().min(2).max(30),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

const IdValidation = (id) => {
  if (/^[0-9a-zA-Z]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequest('Передана некорректная запись id.');
};

const getUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(IdValidation),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

const getCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(IdValidation),
  }),
});

module.exports = {
  createUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  getUserValidation,
  loginValidation,
  createCardValidation,
  getCardValidation,
};
