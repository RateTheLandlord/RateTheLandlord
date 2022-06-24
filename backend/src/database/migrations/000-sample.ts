exports.up = async function (DB) {
  await DB`SELECT 1 + 1 as num`;
};

exports.down = async function () {
  // My pre-configured "undo" function
};
