// models/user.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле (name) обязательно для ввода'],
    minlength: [2, 'Длина значения должна быть более 2 символов'],
    maxlength: [30, 'Длина значения должна быть не более 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле (link) обязательно для ввода'],
    validate: {
      validator(v) {
        return v.includes('http');
      },
      message: 'Это значение должно содержать url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле (owner) обязательно для ввода'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
