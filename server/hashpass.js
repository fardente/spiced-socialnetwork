const { hash, genSalt } = require("bcryptjs");

module.exports = function (password) {
    return genSalt().then((salt) => {
        return hash(password, salt);
    });
};
