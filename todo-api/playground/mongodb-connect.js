const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB server');
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Unabled to add todo', err);
    //         return;
    //     }

    //     console.log('Added todo document:', JSON.stringify(result.ops, undefined, 2));
    // });

    let name = 'Jon';
    let age = 30;
    let location = 'The Wall';
    let user = { name, age, location };

    db.collection('Users').insertOne(user, (err, result) => {
        if (err) {
            console.log('Unabled to add user', err);
            return;
        }

        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});