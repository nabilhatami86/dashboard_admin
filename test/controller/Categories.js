const Categories = require('../model/Categories');

const getCategories = async (req, res, next) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

const createCategories = async (req, res, next) => {
    try {
        const { ct_name, ct_code, ct_created_at, ct_updated_at } = req.body;

        if (!ct_name || ct_code) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newCategory = new Categories({
            ct_name,
            ct_code,
            ct_created_at,
            ct_updated_at
        });

        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }

};

const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const category = await Categories.findByIdAndUpdate(id, payload, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error updating category', error: err.message });
    }
    next(err)
};

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting category', error: err.message });
    }
}

module.exports = {
    getCategories,
    createCategories,
    updateCategory,
    deleteCategory
}