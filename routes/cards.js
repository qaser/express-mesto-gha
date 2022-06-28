const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createCardValid,
  parameterIdValid,
} = require('../middlewares/validationJoi');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', auth, createCardValid, createCard);
router.delete('/:cardId', auth, parameterIdValid('cardId'), deleteCard);
router.put('/:cardId/likes', auth, parameterIdValid('cardId'), likeCard);
router.delete('/:cardId/likes', auth, parameterIdValid('cardId'), dislikeCard);

module.exports = router;
