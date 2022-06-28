// models/user.js
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const { isEmail, isURL } = require('validator');
// const Unauthorized = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: "Поле 'avatar' не соответствует формату URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new Unauthorized({ message: 'Указан некорректный Email или пароль.' });
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new Unauthorized({ message: 'Указан некорректный Email или пароль.' });
//           }
//           return user;
//         });
//     });
// };

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
