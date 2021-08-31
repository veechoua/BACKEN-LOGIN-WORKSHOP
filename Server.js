const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const Router = require('./router/routes');

const uri = process.env.ATLUS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const  connections =  mongoose.connection;
connections.once('open',() =>{
    console.log("MongoDB database connection is successfuly");
})

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use('/we-use-router', Router);


app.listen(port,() =>{
    console.log(`Server is runnig on port: ${port}`);
})