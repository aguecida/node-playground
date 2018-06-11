const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'abc123';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = '$2a$10$URwHURUZ6sSRK3Zd0aV7SeIjZybg71IQ3Xaq8.zkKpVwZygdiT47y';

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});

// ------------------

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, 'abc123');
// console.log(token);

// let decoded = jwt.verify(token, 'abc123');
// console.log(decoded);

// -------------------

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// }
// else {
//     console.log('Data was changed. Do not trust');
// }