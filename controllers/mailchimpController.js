const mailchimp = require('@mailchimp/mailchimp_marketing');
const crypto = require('crypto');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

function getSubscriberHash(email) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest("hex");
}

function formatHorario(data) {
    if (data.mode === 'semi-private') {
        const days = data.selectedIntensity === 'twice' ? ['Tue', 'Thu'] : ['Mon', 'Wed', 'Fri'];
        return days.map(day => `${day}:${data.selectedTimeSemiPrivate}`).join(', ');
    } else if (data.mode === 'private') {
        // Assuming selectedTimesPrivate is a JSON string of an object
        return Object.entries(JSON.parse(data.selectedTimesPrivate))
                     .map(([day, time]) => `${day}:${time}`).join(', ');
    }
    // Default return or handle 'empresas' case as needed
    return '';
}

async function addOrUpdateContactToMailchimp(data) {
    console.log('Received data:', data);
    const subscriberHash = getSubscriberHash(data.email);
    const horario = formatHorario(data);
    try {
        const response = await mailchimp.lists.setListMember(
            process.env.MAILCHIMP_AUDIENCE_ID,
            subscriberHash,
            {
                email_address: data.email,
                status_if_new: 'subscribed', // Change this to 'pending' if you want to send a confirmation email
                merge_fields: {
                    FNAME: data.firstName,
                    LNAME: data.lastName,
                    PHONE: data.phone,
                    MODALIDAD: data.mode,
                    EDAD: data.edad,
                    HORARIO: horario,
                    COMPANY: data.mode === 'empresas' ? data.companyName : '',
                    EMPLOYEES: data.mode === 'empresas' ? data.employeeCount : ''
                },
                tags: ['pending payment']
            }
        );
        console.log('Contact added/updated in Mailchimp', response);
        return { success: true, message: 'Recibimos tu formulario exitosamente' };
    } catch (error) {
        let errorMessage = 'Error adding contact to Mailchimp';
        let errorCode = 500;

        if (error.response && error.response.body) {
            if (error.response.body.title === "Forgotten Email Not Subscribed") {
                errorMessage = 'Tu correo fue eliminado de nuestra lista de contactos en el pasado y no puede usarse nuevamente en éste formulario. Utiliza un correo diferente o escribenos por Whatsapp para ayudarte a añadir nuevamente éste correo y registrar tus datos';
                errorCode = 400;
            } else {
                errorMessage += ': ' + error.response.body.detail;
            }
        }

        console.error(errorMessage);
        return { success: false, errorCode, message: errorMessage };
    }
    
}

module.exports = { addOrUpdateContactToMailchimp };
