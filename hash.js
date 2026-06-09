const bcrypt = require("bcrypt");

async function generatePassword() {
  const password = await bcrypt.hash("admin", 10);

  console.log(password);
}

generatePassword();
