exports.up = async function (DB) {
  await DB`
      CREATE TABLE review (
        id SERIAL PRIMARY KEY, 
        name TEXT,
        email TEXT,
        password TEXT
        blocked BOOLEAN
        admin BOOLEAN
      );
    `;
};
