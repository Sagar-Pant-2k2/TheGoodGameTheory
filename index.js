const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();
const bookRoute = require('./routes/books');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api/v1/books',bookRoute);
mongoose.connect(process.env.DB_STRING);
const dbConnection = mongoose.connection;

dbConnection.on('error',(err)=>{
    console.log("error connecting to database");
})
dbConnection.on('open',()=>console.log('connected to databse'));

app.listen(3000,()=>{
    console.log('listening to server 3000')
})
console.log('working fine')