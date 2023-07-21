const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { auth } = require('./middlewares/auth');
const { errorsMV } = require('./middlewares/errors');
const {
  login, createUser,
} = require('./controllers/users');
const router = require('./routes/index');
const {
  createUserValidation, loginValidation,
} = require('./middlewares/validation');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.use(bodyParser.json());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(router);
app.use(errors());
app.use(errorsMV);

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
