const router = require('express').Router();

const {
    addDummyUsers,
    addDummyProducts,
    addDummyCategories,
    addDummyOrders,
} = require('../controller/Dummy');

router.post('/add-users', addDummyUsers);
router.post('/add-products', addDummyProducts);
router.post('/add-categories', addDummyCategories);
router.post('/add-orders', addDummyOrders);

module.exports = router;
