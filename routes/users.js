const router = require('express').Router();

const { getUsers, createUser, getUserId } = require('../controllers/users');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserId);

module.exports = router;
