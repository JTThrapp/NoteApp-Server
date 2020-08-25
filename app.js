// require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let note = require('./controllers/notecontroller');
let user = require('./controllers/usercontroller');
let login = require('./controllers/logincontroller');
let notebook = require('./controllers/notebookcontroller');

sequelize.sync();
// sequelize.sync({force:true})


app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/note', note)
app.use('/user', user);
app.use('/login', login);
app.use('/notebook', notebook);

app.listen(3000, function() {
    console.log('App is listening on port 3000');
})