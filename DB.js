const mongoose = require('mongoose');
const url = "mongodb+srv://bookstore:bookstore@bookstore.8uw7x.mongodb.net/Book_Store?retryWrites=true&w=majority"
mongoose.connect(url)
.then(()=>{
    console.log(`Success connect to Database`);
}).catch((err)=>{
    console.log(err);
})
exports.mongoose;