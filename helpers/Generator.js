const jwt = require('jsonwebtoken');

class Token {
  async generate(phone) {
    const token = await jwt.sign(phone, process.env.TOKEN_SECRET, {})
    return token;
  }
}

module.exports = Token;