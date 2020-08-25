const Sequelize = require('sequelize');
const sequelize = new Sequelize('NoteApp', 'postgres', 'Letjtin94', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to NoteApp postgres database');
    },
    function(err) {
        console.log(err);
    }
);

// import Group from './models/group';
// import Log from './models/log';
Notebook = sequelize.import('./models/notebook');
Note = sequelize.import('./models/note');


Notebook.hasMany(Note);
Note.belongsTo(Notebook);

module.exports = sequelize;