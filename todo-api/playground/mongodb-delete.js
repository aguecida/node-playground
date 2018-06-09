const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB server');
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then(result => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then(result => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({ completed: false }).then(result => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({ name: 'Daniele' }).then(result => {
    //     console.log(result);
    // });

    db.collection('Users').find({ name: 'Tim' }).toArray().then(docs => {
        db.collection('Users').findOneAndDelete({ _id: new ObjectID(docs[0]._id) }).then(result => {
            console.log(result);
        });
    });
});