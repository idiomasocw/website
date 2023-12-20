const express = require('express');
const MercadoPagoController = require('../controllers/mercadoPagoController');
const axios = require('axios');

const router = express.Router();

// Endpoint for creating subscriptions
router.post('/create', async (req, res) => {
    console.log("Received request to create subscription with token:", req.body.cardToken);
    console.log("Received transaction amount:", req.body.transactionAmount);  // Log for verification

    try {
        const subscription = await MercadoPagoController.createSubscription(req.body.email, req.body.cardToken, req.body.docType, req.body.docNumber, req.body.transactionAmount, req.body.serviceName);
        console.log('Subscription successfully created:', subscription);
        res.json(subscription);
    } catch (error) {
        console.error('Error processing subscription request:', error.message);
        res.status(500).json({ error: 'Error processing subscription request', details: error.message });
    }
});

// Endpoint for webhook notifications
router.post('/notifications', async (req, res) => {
    console.log('Webhook received:', req.body);

    if (req.body.type === 'payment' && req.body.action === 'payment.created') {
        const paymentId = req.body.data.id;
        console.log('Received payment ID:', paymentId);

        try {
            const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
                }
            });

            // Check if payment is approved
            if (response.data.status === 'approved') {
              console.log("Payment confirmed for payment ID:", paymentId);
              // TODO: Implement the action to enroll user in Moodle course
              console.log('The user has completed the payment and has been enrolled in Moodle');
          }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    }

    res.status(200).send('Notification received');
});

module.exports = router;