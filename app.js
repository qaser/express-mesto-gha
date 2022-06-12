const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const app = express();

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 404;
  }
}

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62a22b178d18b6ca3e196b0b',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена =('));
});

app.listen(PORT);
