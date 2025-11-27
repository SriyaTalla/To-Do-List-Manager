const asyncHandler = require('express-async-handler');
const messageQueue = require('../utils/messageQueue');

// @desc    Process payment (Dummy)
// @route   POST /api/payment
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        res.status(400);
        throw new Error('Please add an amount');
    }

    const paymentData = {
        userId: req.user._id,
        amount,
        timestamp: new Date(),
    };

    // Publish to queue
    messageQueue.publish('payment_processing', paymentData);

    res.json({ message: 'Payment processing started', data: paymentData });
});

module.exports = { processPayment };
