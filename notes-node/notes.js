const fs = require('fs');

let fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }
    catch (err) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`title: ${note.title}`);
    console.log(`body: ${note.body}`);
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = { title, body };

    let dupes = notes.filter(note => note.title === title);

    if (dupes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
};

let getNote = (title) => {
    let notes = fetchNotes();
    let matchingNotes = notes.filter(note => note.title === title);
    return matchingNotes.length > 0 ? matchingNotes[0] : null;
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};