const yargs = require('yargs');
const axios = require('axios');

const weather = require('./weather/weather');

yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h');

const argv = yargs.argv;

let encodedAddress = encodeURIComponent(argv.address);
const secret = weather.apiSecret;

if (!secret) {
    console.log('Please provide api secret to get weather');
    return;
}

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`).then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Over query limit');
    }

    console.log(response.data.results[0].formatted_address);
    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;

    return axios.get(`https://api.darksky.net/forecast/${secret}/${latitude},${longitude}`);
}).then(response => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The current temperature is ${temperature}, feels like ${apparentTemperature}`);
}).catch(e => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    }
    else {
        console.log(e.message);
    }
});