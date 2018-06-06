const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

yargs.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'Get all notes')
.command('read', 'Read a note', {
    title: titleOptions
})
.command('remove', 'Remove a note', {
    title: titleOptions
})
.help();

const argv = yargs.argv;

let command = argv._[0];
console.log('Command:', command);

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);

    if (note) {
        console.log('Note added!');
        notes.logNote(note);
    }
    else {
        console.error(`Could not add note because note with title ${argv.title} already exists`);
    }
}
else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Got ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
}
else if (command === 'read') {
    let noteRead = notes.getNote(argv.title);
    if (noteRead) {
        console.log('Got note!');
        notes.logNote(noteRead);
    }
    else {
        console.error('Could not find note');
    }
}
else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 
        'Note was removed' :
        'Note not found'

    console.log(message);
}
else {
    console.log('Command not recognized');
}