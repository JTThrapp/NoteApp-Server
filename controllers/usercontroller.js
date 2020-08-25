let router = require('express').Router();
let User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// USER Signup
router.post('/', function (req, res) {

    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            const token = jwt.sign({id: user.id}, "Letjtin94", {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }
    )

    .catch(err => res.status(500).json({error: err}))
});

// //USER SIGN IN

// router.post('/login', function(req, res){
    
//     User.findOne({
//         where: {
//             username: req.body.user.username
//         }
//     })
//     .then(function loginSuccess(user){
//         if(user) {
//             bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
//                 if (matches) {
//                     let token = jwt.sign({id: user.id}, "Letjtin94", {expiresIn: 60 * 60 * 24})

//                     res.status(200).json({
//                         user: user,
//                         message: 'Login Attempt Successful',
//                         sessionToken: token
//                     })
//                 } else {
//                     res.status(502).send({ error: "Login Failed"});
//                 }
//             });
//     }   else {
//         res.status(500).json({ error: 'User does not exist.'})
//       }
//     })
//     .catch(err => res.status(500).json({error: err}))
// });


module.exports = router;