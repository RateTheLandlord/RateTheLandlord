exports.up = async function (DB) {
    await DB`
      ALTER TABLE review
      ADD dateAdded
      TIMESTAMP DEFAULT now();
    `;
  };
  