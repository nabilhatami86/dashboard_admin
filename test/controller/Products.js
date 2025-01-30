const Products = require('../model/Products');


const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};


const createProduct = async (req, res) => {
    const { pd_id, pd_name, pd_code, pd_ct_id, pd_price } = req.body;

    try {
        const newProduct = new Products({
            pd_id,
            pd_name,
            pd_code,
            pd_ct_id,
            pd_price
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, payload, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
