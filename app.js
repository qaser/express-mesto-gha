const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// const { registerValid, loginValid } = require('./middlewares/validationJoi');
// const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// обработка некорректного адреса
app.use((req, res, next) => {
  res.status(404).send({ message: 'Проверьте адрес запроса' });
  next();
});

// app.use(errorLoger);

app.use(auth);

// app.use(errors());

app.use(errorHandler);

app.listen(PORT);
