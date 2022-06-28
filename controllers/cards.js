const Card = require('../models/card');
// const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// const errorBadRequest = 'Передан несуществующий _id карточки';

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
    })
    .then((card) => {
      if (!card._id) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для удаления карточки' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new BadRequestError('Переданы некорректные данные'));
    })
    .then((card) => {
      if (!card) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятия лайка' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      next(new BadRequestError('Переданы некорректные данные'));
    })
    .then((card) => {
      if (!card) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятия лайка' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
