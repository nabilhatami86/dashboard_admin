const router = require('express').Router();

const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controller/Users');

router.get('/user', getUsers);
router.post('/user', createUsers);
router.put('/user/:id', updateUsers);
router.delete('/user/:id', deleteUsers);


module.exports = router;