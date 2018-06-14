const axios = require('axios');

const secret = null;

const getExchangeRate =  async (from, to) => {
    if (!secret) {
        throw new Error('API secret is required');
    }

    try {
        let response = await axios.get(`http://data.fixer.io/api/latest?access_key=${secret}`);
        let euro = 1 / response.data.rates[from];
        let rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    }
    catch(err) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};

const getCountries = async currency => {
    try {
        let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map(country => country.name);
    }
    catch(err) {
        throw new Error(`Unable to get countries that use ${currency}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    let rate = await getExchangeRate(from, to);
    let convertedAmount = (amount * rate).toFixed(2);
    let countries = await getCountries(to);

    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'CAD', 10).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err.message);
});