const { Gaxios } = require('gaxios');

const gaxios = new Gaxios({
  errorRedactor: (error) => error, // Return the full error without redacting
});

module.exports = gaxios;
