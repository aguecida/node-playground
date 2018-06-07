const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const underMaintenance = false;

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}\n`;

    fs.appendFile('server.log', log, err => {
        if (err) {
            console.log('Unable to log to file');
        }
    });

    next();
});

app.use((req, res, next) => {
    if (underMaintenance) {
        res.render('maintenance.hbs');
    }
    else {
        next();
    }
});

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