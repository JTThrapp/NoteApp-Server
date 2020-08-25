let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Notebook = require('../db').import('../models/notebook');

// router.get('/practice', function(req, res){
//     res.send('Hey, This is a practice route!')
// })

// NOTEBOOK CREATE
router.post('/', validateSession, (req, res) => {
    const notebookEntry = {
        title: req.body.notebook.title,
        // important: req.body.group.important,
        owner: req.user.id
    }
    Notebook.create(notebookEntry)
        .then(group => res.status(200).json(group))
        .catch(err => res.status(500).json({ error: err}))
});

//GET ALL NOTEBOOKS
// router.get("/", (req, res) => {
//     Notebook.findAll()
//         .then(notebooks => res.status(200).json(notebooks))
//         .catch(err => res.status(500).json({ error: err}))
// });

// GET All NOTEBOOKS FOR THIS USER
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Notebook.findAll(
        {
        where: { owner: userid }
    }
    )
        .then (notebook => res.status(200).json(notebook))
        .catch (err => res.status(500).json( {error: err}))
});


// GET NOTEBOOKS BY ID
router.get("/:id", function (req, res){
    let id = req.params.id;

    Notebook.findAll({
        where: {id: id, owner: req.user.id}
    })
    .then(notebook => res.status(200).json(notebook))
    .catch(err => res.status(500).json( { error: err }))
});

// Just goofin around
// router.get('/YOLO', function(req, res){
//     res.send('The motto is: You Only Live Once.')
// })

// UPDATE BY NOTEBOOK ID
router.put("/:id", validateSession, function (req, res) {
    const updateNotebookEntry = {
        title: req.body.notebook.title,
        // important: req.body.notebook.important,
    };

    const query = { where : { id: req.params.id, owner: req.user.id }};

    Notebook.update(updateNotebookEntry, query)
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err}));
});

//DELETE BY NOTEBOOK ID
router.delete("/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, owner: req.user.id }};

    Notebook.destroy(query)
        .then(()=> res.status(200).json({ message: "Notebook Removed (if correct owner)" }))
        .catch((err) => res.status(500).json({error: err}));
});


module.exports = router