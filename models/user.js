// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" обязательно для ввода'], // имя — обязательное поле
    minlength: [2, 'Длина имени должна быть более 2 символов'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Длина имени должна быть более 2 символов'], // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: [true, 'Поле "about" обязательно для ввода'],
    minlength: [2, 'Длина значения должна быть более 2 символов'],
    maxlength: [30, 'Длина значения должна быть более 2 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "about" обязательно для ввода'],
    validate: {
      validator(v) {
        return v.includes('http');
      },
      message: 'Это значение должно содержать url',
    },
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
