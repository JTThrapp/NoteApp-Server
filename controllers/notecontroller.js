let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Note = require('../db').import('../models/note');

// router.get('/practice', function(req, res){
//     res.send('Hey, This is a practice route!')
// })

//  NOTE CREATE
router.post('/', validateSession, (req, res) => {
    const noteEntry = {
        title: req.body.note.title,
        body: req.body.note.body,
        important: req.body.note.important,
        notebookId: req.body.note.notebookId,
        owner: req.user.id
    }
    Note.create(noteEntry)
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json({ error: err}))
});


//GET ALL NOTES
// router.get("/", (req, res) => {
//     Note.findAll()
//         .then(note => res.status(200).json(note))
//         .catch(err => res.status(500).json({ error: err}))
// });

// GET All NOTES BY USER
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Note.findAll({
        where: { owner: userid }
    })
        .then (note => res.status(200).json(note))
        .catch (err => res.status(500).json( {error: err}))
});

// // GET NOTES BY ID
// router.get("/:id", function (req, res){
//     // let id = req.params.id;

//     Note.findAll({
//         where: {id: req.params.id, owner: req.user.id}
//     })
//     .then(note => res.status(200).json(note))
//     .catch(err => res.status(500).json( { error: err }))
// });

// GET NOTES BY NOTEBOOK
router.get("/:notebook", function (req, res){
    // let id = req.params.id;

    Note.findAll({
        where: {notebookId: req.params.notebook, owner: req.user.id}
    })
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json( { error: err }))
});

// Just goofin around
// router.get('/YOLO', function(req, res){
//     res.send('The motto is: You Only Live Once.')
// })

// UPDATE BY NOTE ID
router.put("/:id", validateSession, function (req, res) {
    const updateNoteEntry = {
        title: req.body.note.title,
        body: req.body.note.body,
        important: req.body.note.important,
        groupId: req.body.note.groupId
    };

    const query = { where : { id: req.params.id, owner: req.user.id }};

    Note.update(updateNoteEntry, query)
        .then((note) => res.status(200).json(note))
        .catch((err) => res.status(500).json({ error: err}));
});

//DELETE BY ENTRY ID
router.delete("/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, owner: req.user.id }};

    Note.destroy(query)
        .then(()=> res.status(200).json({ message: "Note Removed" }))
        .catch((err) => res.status(500).json({error: err}));
});


module.exports = router