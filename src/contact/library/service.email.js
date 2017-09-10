import AWS from 'aws-sdk';
import config from '../../config';

export function sendEmail(msg) {
    const ses = new AWS.SES({
        region: 'us-east-1',
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
    });
    const content = `
        ${msg.message}

        Please respond to ${msg.email}
    `;
    const email = {
        Source: config.aws.serviceEmail,
        Destination: {
            ToAddresses: [config.aws.adminEmail]
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
