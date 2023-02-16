exports.up = async function (DB) {
  await DB`
      ALTER TABLE users
      ADD lockout_time
      TIMESTAMP DEFAULT now();
      `;
};
