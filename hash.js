const bcrypt = require("bcrypt");

async function generatePassword() {
  const password = await bcrypt.hash("210602100", 10);

  console.log(password);
}

generatePassword();
