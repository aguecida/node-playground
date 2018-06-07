const express = require('express');
const hbs = require('hbs');

const port = '3000';

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', str => str.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});