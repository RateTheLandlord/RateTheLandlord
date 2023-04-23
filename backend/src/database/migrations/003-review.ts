exports.up = async function (DB) {
    await DB`
      ALTER TABLE review RENAME dataadded TO date_added
    `;
  };
  