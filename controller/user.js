var mongoose = require('mongoose')
const users = require('../models/user');
const validator = require('validator');
const books = require('../models/book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// make our crud operatio here
// sign up function create 
exports.signUp = (req, res) => {
    let validateEmail = validator.isEmail(req.body.email);
    let validatePassword = validator.isStrongPassword(req.body.password);
    if (validateEmail && validatePassword) {
        var user = new users({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10), 
            email: req.body.email,
            firstName: req.body.firstName
        })

    } else {
        res.status(401).send(`unfailed Email or password`)
    }
    user.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(401).send(err)
        })

}
// login
exports.login = (req, res) => {           
    users.findOne({ email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).send("serever error");
            }
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).send("user not found please register");
        }
        const userToken = jwt.sign({ id: user._id, username: user.username, userType: user.userType }, "ahims");
        jwt.verify(userToken, "ahims" , (err, data) => {
            if (data) {
                books.find({} , (err, books) => {
                    const c = `userName:${data.username} 
                    books:${books}
                    token:${userToken}`;
                    res.send(c);
                });
            }
            if (err) {
                res.send("Your cannot access");
            }
        });
        
    });
}
//list all users 
exports.list = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
        if (data.userType === "admin" ) {
            users.find({}, { username: 1 , userType:1, _id:0 }).then(function (user) {
                res.send(user);
            });
        } else {
            res.send("You cannot access users");
        }
    })
}

exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
        if (data.userType === "admin") {
            users.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                firstName: req.body.firstName,
                userType: req.body.userType
            }, { new: true })
                .then(user => {
                    res.send(user)
                });          
        } else if (data.userType === "user" ){
            users.findByIdAndUpdate(data.id, {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                firstName: req.body.firstName
            }, { new: true })
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");

        }
})

}


exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
        console.log(data.userType);
        if (data.userType === "admin") {
            users.findByIdAndDelete(req.params.id)
                .then(user => {
                    res.send(user)
                })           
        } else if (data.userType === "user" ){
            users.findByIdAndDelete(data.id)
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");
        }
})

}






