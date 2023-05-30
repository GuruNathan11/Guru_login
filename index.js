const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const mongodb = require("./config.js");
app.use('/users',userRouter);
app.use("/note",noteRouter);

app.get('/',(req,res) => res.send("Welcome to M-Control Login Page..."));

app.use((req,res,next) =>{
    console.log("HTTP Method -" +req.method + ", URL - " + req.url);
    next();
})
const db = mongoose.connect(mongodb.MONGO_URI);
db.then(() =>{ console.log("MongoDb Connected Successfully") })
.catch(error =>{console.log("Failed to connect with Mongo Db",error);})

const port = 3000
app.listen(port,()=>{console.log("App running on Port",port)})


