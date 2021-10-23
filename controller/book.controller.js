const List = require("../models/book.model.js");

exports.listBook = (req, res)=>{
    List.find()
    .then(data => {
        res.send(data)
    }).catch (err => {
        res.status(200).send(err)
    })
};


exports.searchBook = (req, res)=>{
    List.findOne({bookName: req.params.bookName})
    .then(data => {
        res.status(200).send(data);
    }).catch (err => {
        console.log(err);
        res.status(401).send(err);
    })
};



exports.createTask = (req, res)=>{
    const task = new List({
        userId:req.body.userId,
        title:req.body.title,
        tags:req.body.tags
    })
    task.save()
    .then(data =>{
        res.send({message:"task was created successfully"})
    }).catch(err => {
        res.send(err)
    })
};


exports.updateTask = (req, res)=>{
    List.findByIdAndUpdate(req.params.id , {
        title:req.body.title,
        tags:req.body.tags,
        updatedAt:Date.now()
    }, {new: true} )
    .then (task=> {
        res.send({message:"task was edited successfully"})
    }).catch(err => {
        res.send(err)
    })
}



exports.deleteTask = (req, res)=>{
    List.findOneAndDelete({_id: req.params.id}, (err, result) => {
        if (err) res.send(500, err)
        res.send(result)
    })
    }