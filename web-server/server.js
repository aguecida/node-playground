const express = require('express');

const port = '3000';

let app = express();
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.send({
        name: 'Daniele',
        likes: [
            'sports',
            'board games'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});