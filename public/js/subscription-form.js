// Get MercadoPago public key from your server
fetch('/config')
    .then(response => response.json())
    .then(config => {
        // Initialize MercadoPago SDK
        const mp = new MercadoPago(config.publicKey);
        function resetForm() {
            document.getElementById('subscription-form').reset();
            document.getElementById('credit-card-icon').src = 'pics/credit-card-icon.svg'; // Path to a default icon
        }

        // Add event listener for form submission
        document.getElementById('subscription-form').addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('paymentModal').style.display = 'block';
            document.querySelector('.submit-button').disabled = true;

            // Remove spaces from card number
            const cardNumberWithoutSpaces = document.getElementById('cardNumber').value.replace(/\s+/g, '');
            const expirationDate = document.getElementById('cardExpirationDate').value.split('/');
            const cardExpirationMonth = expirationDate[0];
            const cardExpirationYear = '20' + expirationDate[1]; // Add '20' to convert to 4-digit year

            // Create card token
            const cardData = {
                cardNumber: cardNumberWithoutSpaces,
                cardholderName: document.getElementById('cardholderName').value,
                cardExpirationMonth: cardExpirationMonth,
                cardExpirationYear: cardExpirationYear,
                securityCode: document.getElementById('securityCode').value
            };

            mp.createCardToken(cardData).then(function (response) {
                // Retrieve transaction amount from sessionStorage
            const transactionAmount = sessionStorage.getItem('transactionAmount');
            const serviceName = sessionStorage.getItem('serviceName');
            console.log("Transaction amount being sent:", transactionAmount);  // Log for verification
            console.log("Service name being sent:", serviceName);


                // Send token to your server for subscription creation
                const email = document.getElementById('payerEmail').value;
                console.log("Email being sent:", email);
                fetch('/api/subscriptions/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        /* email: document.getElementById('payerEmail').value, */
                        email: email,
                        docType: document.getElementById('docType').value,
                        docNumber: document.getElementById('docNumber').value,
                        cardToken: response.id,
                        transactionAmount: transactionAmount,  // Include the transaction amount
                        serviceName: serviceName  // Include the service name
                    })
                })
                    .then(response => {
                        // Check if the response status indicates success
                        if(response.ok) {
                            return response.json(); // Process the successful response
                        } else {
                            throw new Error('Subscription failed'); // Handle failed subscription
                        }
                    })
                    .then(data => {
                        resetForm();
                        // Update modal with success message
                        document.querySelector('.loader').style.display = 'none';
            document.getElementById('paymentStatus').innerText = 'Payment Successful!';
            // Re-enable the button
            document.querySelector('.submit-button').disabled = false;
                        console.log('Subscription created:', data);
                        
                        // Change "Okay" button behavior to redirect to "thank you" page
    document.getElementById('modalOkButton').onclick = function() {
        window.location.href = '/thankyou';
    };
                    })
                    .catch(error => {
                        // Update modal with error message
                        document.querySelector('.loader').style.display = 'none';
            document.getElementById('paymentStatus').innerText = 'Payment Failed.';
            // Re-enable the button
            document.querySelector('.submit-button').disabled = false;
                    
                        console.error('Error creating subscription:', error);
                        // Change "Okay" button behavior to just close the modal
    document.getElementById('modalOkButton').onclick = function() {
        document.getElementById('paymentModal').style.display = 'none';
    };
                    });
            }).catch(function (error) {
                console.error('Error creating card token:', error);
                // Handle card token creation error
            });
        });
    });


/* UI / UX code */

const cardInput = document.getElementById('cardNumber');
const cardIcon = document.getElementById('credit-card-icon'); // assuming you have an element with this ID for the icon

cardInput.addEventListener('input', function () {
    // Remove non-digits and format with spaces
    this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

    // Limit to 19 characters (max length of a credit card number)
    this.value = this.value.substring(0, 19);

    // Get the first 8 digits (maximum needed for identification)
    const bin = this.value.replace(/\s/g, '').substring(0, 8);

    // Update card icon based on BIN
    updateCardIcon(bin);
});

function updateCardIcon(bin) {
    let brand = getCardBrand(bin);
    switch (brand) {
        case 'visa':
            cardIcon.src = 'pics/visa.svg'; // Update with actual path
            break;
        case 'mastercard':
            cardIcon.src = 'pics/master.svg'; // Update with actual path
            break;
        case 'amex':
            cardIcon.src = 'pics/ae.svg'; // Update with actual path
            break;
        case 'discover':
            cardIcon.src = 'pics/discover.svg'; // Update with actual path
            break;
        // Add more cases as needed
        default:
            cardIcon.src = 'pics/credit-card-icon.svg'; // Path to a default icon
    }
}

function getCardBrand(bin) {
    if (/^4[0-9]{5}/.test(bin)) {
        return 'visa';
    } else if (/^(5[1-5][0-9]{4}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(bin)) {
        return 'mastercard';
    } else if (/^3[47][0-9]{4}/.test(bin)) {
        return 'amex';
    } else if (/^6(?:011|22|4[4-9]|5)/.test(bin)) {
        return 'discover';
    }
    // Add more patterns as needed
    return null;
}


// Add event listener for expiration date formatting
const expirationDateInput = document.getElementById('cardExpirationDate');
expirationDateInput.addEventListener('input', function (e) {
    var input = e.target.value.replace(/\D/g, '').substring(0, 4); // Remove non-digits and limit length
    if (input.length > 2) {
        input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    e.target.value = input;
});


document.getElementById('docNumber').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, ''); // Replace any non-digit characters with an empty string
});
