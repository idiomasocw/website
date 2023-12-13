const express = require('express');
const router = express.Router();
const IntegrationManager = require('../services/integrationManager');

router.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        const result = await IntegrationManager.handleMailchimpIntegration(formData);

        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(result.errorCode).send(result.message);
        }
    } catch (error) {
        console.error('Error in form submission:', error);
        res.status(500).send('Server error during form submission');
    }
});

module.exports = router;
