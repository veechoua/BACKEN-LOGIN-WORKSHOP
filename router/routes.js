const router = require('express').Router();
const ServiceUser = require('../models/ServiceUser');
const controlUser = require('../controller/Users');
const bycrypt = require('bcrypt');

// Users
router.route('/getuser').get((req, res) =>{
    ServiceUser.find()
    .then(users =>res.json(users))
    .catch(err =>res.status(400).json('Error:'+ err));
});
router.post('/adduser', controlUser.adduser);
router.post('/userLogIn', controlUser.login);
router.route('/getuser/:id').get((req, res) =>{
    ServiceUser.findById(req.params.id)
    .then(users =>res.json(users))
    .catch(err =>res.status(400).json('Error:'+ err));
});
router.route('/deleteuser/:id').delete((req, res) =>{
    ServiceUser.findByIdAndDelete(req.params.id)
    .then(() =>res.json('user deleted!'))
    .catch(err =>res.status(400).json('Error:'+ err));
});
router.route('/updateuser/:id').post((req, res) =>{
    ServiceUser.findById(req.params.id)
    .then(users =>{
        users.username = req.body.username,
        users.password = req.body.password

        users.save()
            .then(()=>res.json('user is updated!'))
            .catch(err => res.status(400).json('Error:' + err))
        
    })
    .catch(err =>res.status(400).json('Error:'+ err));
});


module.exports = router;