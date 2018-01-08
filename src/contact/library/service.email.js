import AWS from 'aws-sdk';

export function sendEmail(msg) {
    const ses = new AWS.SES({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const content = `
        ${msg.message}

        Please respond to ${msg.email}
    `;
    const email = {
        Source: process.env.SERVICE_EMAIL,
        Destination: {
            ToAddresses: [process.env.ADMIN_EMAIL]
        },
        Message: {
            Subject: {
                Data: 'Inquiry From Contact Form'
            },
            Body: {
                Text: {
                    Data: content
                }
            }
        }
    };

    ses.sendEmail(email, (err, data) => {
        if (err) return Promise.reject(err);
        return Promise.resolve(data);
    });
}
