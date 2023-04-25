exports.up = async function (DB) {
  await DB`
  COPY review (landlord,country_code,city,state,zip,review,repair,health,stability,privacy,respect,date_added,flagged,flagged_reason,admin_approved,admin_edited) FROM '/reviews.csv' DELIMITER ',' CSV HEADER;
      `;
};
