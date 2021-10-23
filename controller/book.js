const books = require('../models/book');
const jwt = require('jsonwebtoken')
// const books = require('../models/user');

// make our crud operatio here



exports.create = (req, res) => {
const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
    if (data) {
        const book = new books({
            bookName: req.body.bookName,
            UserName: req.body.UserName,
            auther: req.body.auther,
            description: req.body.description,
            userid: data.id
        } )
        book.save()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    } else {
        res.send("You cannot access books");
    }

})

  

}

exports.listOneBook = (req, res, next)=> {
    books.findOne({ bookName: req.body.bookName },function (err, book) {
        if (err) res.status(400).send(err);
        res.status(200).send(book);
    });
}

exports.listAllBooks = (req, res) => {
    books.find()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    
}

exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
        if (data.userType === "user" ) {
            books.findOneAndUpdate({ _id: req.params.id ,userid: data.id}, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        } else if (data.userType === "admin") {
            books.findByIdAndUpdate(req.params.id, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}

exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, data) => {
        if (data.userType === "user" ) {
            console.log(data.userType)
            books.findOneAndDelete({ _id: req.params.id ,userid: data.id},(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        } else if (data.userType === "admin") {
            books.findByIdAndDelete(req.params.id,(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}


exports.paginate= (req, res)=>{
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    books.find({}).skip(skip).limit(limit)
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};
