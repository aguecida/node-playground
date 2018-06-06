const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFile('notes.json', originalNoteString, err => {
    if (err) {
        console.log(err);
    }

    fs.readFile('notes.json', (err, data) => {
        let note = JSON.parse(data);
        console.log(typeof note);
        console.log(note.title);
    });
});