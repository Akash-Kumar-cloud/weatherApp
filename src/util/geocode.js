const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWthc2gyNTAzIiwiYSI6ImNrOXBmN3c1ODBhMWYzZ3FoYnY0NTEzb3kifQ.I7-H2xjEl1S3oTmOmJGRBA';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
