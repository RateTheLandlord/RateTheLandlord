exports.up = async function (DB) {
  await DB`
        ALTER TABLE users 
        ADD login_attempts
        NUMBER DEFAULT 0;
      `;
  await DB`
    ALTER TABLE users
    ADD login_lockout
    BOOLEAN DEFAULT false
    `;
  await DB`
    ALTER TABLE users
    ADD last_login_attempt
    TIMESTAMP DEFAULT now();
    `;
};
