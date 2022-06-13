const User = require('../models/user');

const errorBadRequest = 'Пользователь по указанному _id не найден';

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(404).send({ message: errorBadRequest });
    })
    .then((user) => {
      if (!user._id) {
        res.status(404).send({ message: errorBadRequest });
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      res.status(404).send({ message: errorBadRequest });
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: errorBadRequest });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      // if (err.name === 'ValidationError') {
      //   res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      // }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      res.status(404).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: errorBadRequest });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      res.status(500).send({ message: err.message });
    });
};
