const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/7a44b08c1b86a13e9b67d25e124caab0/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '?units=si';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degrees out. There is ' +
          body.currently.precipProbability +
          '% chance of rain. The high today is ' +
          body.daily.data[0].temperatureHigh +
          ' with a low of ' +
          body.daily.data[0].temperatureLow
      );
    }
  });
};

module.exports = forecast;
