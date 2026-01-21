const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place order
router.post('/', async (req, res) => {
    const { customerName, address, items, totalAmount } = req.body;
    const order = new Order({
        customerName,
        address,
        items,
        totalAmount
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
