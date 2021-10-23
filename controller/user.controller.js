var mongoose = require('mongoose')
const users = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const validator = require('validator');


exports.getUsers = (req, res)=>{
    users.find({}, {firstName: 1, _id:0})
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};

//signup
exports.createUser = (req, res)=>{
    let validEmail = validator.isEmail(req.body.email);
    let validPass = validator.isStrongPassword(req.body.password);

    if(validEmail && validPass){
        const user = new users({
            userName:req.body.userName,
            password: bcrypt.hashSync(req.body.password, 10),
            email:req.body.email
        })        
        user.save()
        .then(data =>{

            res.status(200).send({message:"user was regitered successfully"})
        }).catch(err => {
            res.status(401).send(err)
        })
    }else{
        console.log('your data not matched.... :(')
    }
    
};


exports.updateUser = (req, res)=>{
    users.findByIdAndUpdate(req.params.id , {
        username:req.body.username,
        uniquepassword:req.body.uniquepassword,
        firstName:req.body.firstName,
        age:req.body.age
    }, {new: true} )
    .then (user=> {
        res.send({message:"user was edited successfully"})
    })
}



exports.deleteUser = (req, res)=>{
    users.findOneAndDelete({_id: req.params.id}, (err, result) => {
        if (err) return res.send(500, err)
    })
    .then (user=> {
        res.send(user)
    })
}


exports.authenticate = (req,res)=>{
    users.find({
        username: req.body.username,
        uniquepassword: req.body.uniquepassword
    })
    .then(data => {
        res.send({
            message:`logged in successfully`,
            username:data.username,
            todos:data.todos
        })
    }).catch (err => {
        res.status(401)
        res.send({
            error:"invalid credentials"
        })
    })
}














// make our crud operatio here

// exports.signUp = (req, res) => {

//     let validateEmail = validator.isEmail(req.body.email);

//     console.log(validateEmail);

//     let validatePassword = validator.isStrongPassword(req.body.password);

//     if (validateEmail && validatePassword) {

//         var user = new users({

//             username: req.body.username,

//              password: bcrypt.hashSync(req.body.password, 10),

//             email: req.body.email,

//             firstName: req.body.firstName

//         })



//     } else {

//         res.status(401).send(`unfailed Email password`)

//     }

//     user.save()

//         .then(data => {

//             res.send(data)

//         }).catch(err => {

//             res.status(401).send(err)

//         })



// }