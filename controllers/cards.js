const mongoose = require('mongoose');
const Cards = require('../models/cards');

module.exports.getCards = ('/', (req, res) => {
  Cards.find({})
    .then((сards) => {
      res.json({ data: сards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
});

module.exports.createCard = ('/', (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  Cards.create({ name, link, owner: req.user._id })
    .then((cards) => {
      res.json({ data: cards });
    })
    .catch((err) => {
      // eslint-disable-next-line no-underscore-dangle
      if (err._message === 'cards validation failed') {
        res.status(400).send({ message: 'Invalid Card-data' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
});

module.exports.deleteCard = ((req, res) => {
  const cardId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).send({ message: 'Invalid id' });
    return;
  }
  Cards.findByIdAndRemove(cardId)
    .orFail(new Error('notValidId'))
    .then((cards) => {
      res.json({ data: cards });
    })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
});
