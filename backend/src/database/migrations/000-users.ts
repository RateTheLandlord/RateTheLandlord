exports.up = async function (DB) {
  await DB`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY, 
        name TEXT,
        email TEXT NOT NULL,
        password TEXT
        blocked BOOLEAN
        role TEXT
        UNIQUE (email)
      );
    `;
};
