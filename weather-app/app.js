const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h');

const argv = yargs.argv;

geocode.geocodeAddress(argv.address, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        weather.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            }
            else {
                console.log(`The current temperature at ${geoResults.address} is ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

