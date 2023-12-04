const express = require('express');
const router = express.Router();
const mailchimpController = require('../controllers/mailchimpController');

router.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        const result = await mailchimpController.addOrUpdateContactToMailchimp(formData);

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
