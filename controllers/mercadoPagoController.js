const axios = require('axios');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid'); // Import the UUID module

dotenv.config();

const MercadoPagoController = {
    // Creates a subscription using the card token
    createSubscription: async (email, cardTokenId, docType, docNumber,transactionAmount,reason) => {
        console.log("Creating subscription with token ID:", cardTokenId);
        console.log("Transaction amount for subscription:", transactionAmount);  // Log for verification
        // Generate a unique external_reference
        const timestamp = Date.now();
        const shortUuid = uuidv4().slice(0, 12); // Get the first 12 characters of the UUID
        const uniqueExternalReference = `${shortUuid}_${timestamp}`;
        console.log("Unique external reference:", uniqueExternalReference); // Log for verification

        try {
            const subscriptionResponse = await axios.post('https://api.mercadopago.com/preapproval', {
                payer_email: email,
                card_token_id: cardTokenId,
                back_url: "http://onecultureworld.com",
                reason: reason,
                status: "authorized",
                external_reference: uniqueExternalReference,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: transactionAmount,  // Use the dynamic transaction amount
                    currency_id: "COP"
                },
        
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
                }
            });
            console.log("Subscription created, response data:", subscriptionResponse.data);
            return subscriptionResponse.data;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    },

    // Additional functions as needed
};
module.exports = MercadoPagoController;