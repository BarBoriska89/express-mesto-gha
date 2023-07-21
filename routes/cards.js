const cardsRouter = require('express').Router();

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  getCardValidation,
} = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', getCardValidation, deleteCard);
cardsRouter.put('/:cardId/likes', getCardValidation, likeCard);
cardsRouter.delete('/:cardId/likes', getCardValidation, dislikeCard);

module.exports = cardsRouter;
