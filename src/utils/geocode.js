const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibWFjYWRpYXpjb2xvbWVzIiwiYSI6ImNqdWc3N2QyZTBseGY0M21qbzRybnRnb2kifQ.s-J4EuRYWzF7nCY8GkKKDQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geocode service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
