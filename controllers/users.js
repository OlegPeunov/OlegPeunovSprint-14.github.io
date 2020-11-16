const mongoose = require('mongoose');
const Users = require('../models/users');

module.exports.getUsers = ('/', (req, res) => {
  Users.find({})
    .then((users) => {
      res.json({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
});

module.exports.createUser = ('/', (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((users) => {
      res.json({ data: users });
    })
    .catch((err) => {
      // eslint-disable-next-line no-underscore-dangle
      if (err._message === 'user validation failed') {
        res.status(400).send({ message: 'Invalid User-data' });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
});

module.exports.getUserId = ('/', (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).send({ message: 'Invalid id' });
    return;
  }
  Users.findById(userId)
    .orFail(new Error('notValidId'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
});
