const aws = require("aws-sdk");
const AWS_KEY = process.env.AWS_KEY || require("./secrets").AWS_KEY;

const AWS_SECRET = process.env.AWS_SECRET || require("./secrets").AWS_SECRET;

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: "eu-central-1",
});

async function sendEmail({ subject, message, email }) {
    const result = await ses
        .sendEmail({
            Source: "Spiced Social Network <schwip+ses@mailbox.org>",
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise();
    console.log(result);
}

module.exports = {
    sendEmail,
};
