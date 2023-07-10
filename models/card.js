const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdIt: {
    type: Date,
    default: Date.now
  }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;