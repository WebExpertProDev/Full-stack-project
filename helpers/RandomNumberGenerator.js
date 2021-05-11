class RandomNumberFiveDigitGenerator {
  generate () {
    let code = String(Math.floor(Math.random()*90000) + 10000);
    console.log(code);
    return code;
  }
}

module.exports = RandomNumberFiveDigitGenerator;