const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {family:4});

app.use(bodyParser.json());


app.use((req,res, next) => {
  req.user = {
    _id: '64a80f5ffbdb6052f49632ef'
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(3000, () => {
    console.log("Сервер запущен!");
})


