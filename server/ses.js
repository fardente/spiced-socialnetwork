const aws = require("aws-sdk");
const secrets = require("./secrets");

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
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
