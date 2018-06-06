const request = require('request');

// Place your DarkSky api secret here
const apiSecret = null;

let getWeather = (latitude, longitude, callback) => {
    if (!apiSecret) {
        callback('Please provide an api secret');
    }
    else {
        request(`https://api.darksky.net/forecast/${apiSecret}/${latitude},${longitude}`, { json: true }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(null, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
            else {
                callback('Error getting weather');
            }
        });
    }
};

module.exports = {
    getWeather,
    apiSecret
};