const User = require('../models/user');

const errorBadRequest = 'Пользователь по указанному _id не найден';

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(404).send({ message: errorBadRequest });
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      res.status(404).send({ message: errorBadRequest });
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id пользователя' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      res.status(404).send({ message: errorBadRequest });
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: errorBadRequest });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id пользователя' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
