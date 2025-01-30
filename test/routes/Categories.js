const router = require('express').Router();

const { getCategories, createCategories, updateCategory, deleteCategory } = require('../controller/Categories')

router.get('/categories', getCategories);
router.post('/categories', createCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories', deleteCategory);

module.exports = router;