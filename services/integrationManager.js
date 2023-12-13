const mailchimpController = require('../controllers/mailchimpController');

const IntegrationManager = {
    async handleMailchimpIntegration(formData) {
        return await mailchimpController.addOrUpdateContactToMailchimp(formData);
    },

    // Future methods for other integrations will go here
};

module.exports = IntegrationManager;
