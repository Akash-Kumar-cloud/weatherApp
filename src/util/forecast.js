const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=1040e7e563705676b3efcb67e64a4444&query=' +
    longitude +
    ',' +
    latitude +
    '&units=m';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to location services!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, body.current.temperature);
    }
  });
};
module.exports = forecast;
