let square = x => x * x;
console.log(square(9));

var user = {
    name: 'Daniele',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
};

console.log(user.sayHiAlt(1, 2, 3));