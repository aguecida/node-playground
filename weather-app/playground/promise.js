let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            }
            else {
                reject('Arguments must be numbers');
            }
        }, 2000);
    });
};

asyncAdd(2, 2).then(result => {
    console.log('Result:', result);
    return asyncAdd(result, 100);
}).then(result => {
    console.log('Result:', result);
}).catch(error => {
    console.log('Error:', error);
});

// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('It worked!');
//         reject('Unable to fulfill promise');
//     }, 2000);
// });

// somePromise.then(message => {
//     console.log('Success:', message);
// }).catch((error) => {
//     console.log('Error:', error);
// });