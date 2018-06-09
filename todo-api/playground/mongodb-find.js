const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB server');
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({ _id: new ObjectID('5b1b163b05110b29289fcf96') }).toArray().then(docs => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch(err => {
    //     console.log('Unable to fetch todos:', err);
    // });

    // db.collection('Todos').find({ completed: false }).count().then(count => {
    //     console.log(`Todos count:${count}`);
    // }).catch(err => {
    //     console.log('Unable to fetch todos:', err);
    // });

    db.collection('Users').find({ name: 'Daniele' }).toArray().then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch(err => {
        console.log('Unable to fetch todos:', err);
    });
});