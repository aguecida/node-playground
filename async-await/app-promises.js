const users = [
    { id: 1, name: 'Mike', schoolId: 101 },
    { id: 2, name: 'Harvey', schoolId: 999 }
];

const grades = [
    { id: 1, schoolId: 101, grade: 86 },
    { id: 2, schoolId: 999, grade: 100 },
    { id: 3, schoolId: 101, grade: 80 }
];

const getUser = id => {
    return new Promise((resolve, reject) => {
        let user = users.find(user => user.id === id);
        user ? resolve(user) : reject(`Unable to find user with id ${id}`);
    });
};

const getGrades = schoolId => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
};

const getStatus = userId => {
    let user;
    return getUser(userId).then(tempUser => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then(grades => {
        let average = 0;

        if (grades.length > 0) {
            average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has an ${average}% in the class`;
    });
};

const getStatusAlt = async userId => {
    let user = await getUser(userId);
    let grades = await getGrades(user.schoolId);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has an ${average}% in the class`;
};

getStatusAlt(1).then(status => {
    console.log(status);
}).catch(err => {
    console.log(err);
})

// getStatus(1).then(status => {
//     console.log(status);
// }).catch(err => {
//     console.log(err);
// });
