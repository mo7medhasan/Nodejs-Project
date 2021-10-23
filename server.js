const express = require('express');
const app = express();
const port = 3000;
require("./DB");
const userRoute = require('./routes/user.routes');
const bookRoute = require('./routes/book.routes');
app.use(express.json());     

app.use("/users", userRoute)
app.use("/books", bookRoute)





app.listen(port,()=>{
    console.log(`server listen on ${port}`)
})