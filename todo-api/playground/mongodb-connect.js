const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB server');
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').find().toArray().then(docs => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch(err => {
        console.log('Unable to fetch todos:', err);
    });

    //client.close();
});