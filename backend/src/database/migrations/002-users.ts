exports.up = async function (DB) {
  await DB`
  INSERT INTO users (name, email, password, blocked, role) VALUES ('Kellen Wiltshire', 'webdevelopment@kellenwiltshire.com', 'temppassword', false, 'ADMIN')
      `;
};
