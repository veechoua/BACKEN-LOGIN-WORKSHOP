const User = require('../models/ServiceUser');
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adduser = (req, res, Next) => {
    bcypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                Error: err
            })
        }
        let user = new User({
            username: req.body.username,
            password: hashedPass
        })
        user.save()
        .then(() => res.json('User is added!'))
        .catch(err =>res.status(400).json('Error:'+err));
    })
    
}

const login = (req, res, Next) =>{
    var username = req.body.username;
    var password = req.body.password
    User.findOne({username:username})
    .then(user=>{
        if(user){
            bcypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({Error: err})
                }
                if(result){
                    let token = jwt.sign({id:user._id ,username: user.username}, 'our_secret', {expiresIn: '1h'})
                    let data = ({id:user._id,username:user.username});
                     res.json({status: 'ok',token: token, data: data})
                }else{
                    return res.json({message: 'Password does not match!'})
                }
            });
        }else{
            return res.json({message: 'User not found!'})
        }
    })
}

module.exports = {
    adduser,
    login
}