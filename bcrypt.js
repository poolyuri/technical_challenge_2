const bcrypt = require('bcrypt');

const password = '123456';
const saltRounds = 10;

// Hash the password
bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
