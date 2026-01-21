const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const { protect, admin } = require('../middleware/authMiddleware');

// Get all products with query params for search and category
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                name: {
                    $regex: req.query.search,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const products = await Product.find({ ...keyword, ...category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create product (Admin)
router.post('/', protect, admin, async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;

    const product = new Product({
        name,
        description,
        price,
        category,
        imageUrl
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update product
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
