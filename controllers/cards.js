const mongoose = require('mongoose');
const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER = 500;

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card.owner._id !== req.user._id) {
        res.status(INTERNAL_SERVER).send({ message: 'Вы не можете удалить чужую карточку.' });
        return;
      }
      console.log(card);
      if (!card) {
        res.status(NOT_FOUND).send({ message: `Карточка с указанным _id ${cardId} не найдена. ` });
      }
      res.send({ message: 'Карточка удалена.' });
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: `Карточка с указанным _id ${cardId} не найдена. ` });
        return;
      }
      res.status(NOT_FOUND).send({ message: 'Ошибка по умолчанию.' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: `Передан несуществующий _id ${cardId} карточки. ` });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятия лайка. ' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: `Передан несуществующий _id ${cardId} карточки. ` });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
        return;
      }
      res.status(INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
};
