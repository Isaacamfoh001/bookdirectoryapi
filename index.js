const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const books = require('./routes/books');
const auths = require('./routes/auth');
const users = require('./routes/users');
require('./middleware/admin');
require('./middleware/verifyToken');


mongoose.connect('mongodb://localhost/bookdirectory')
        .then(()=>console.log('Connected to MongoDB server'))
        .catch((err)=> console.log(err));
app.use(express.json());
app.use('/api/books', books);
app.use('/api/auths', auths);
app.use('/api/users', users);

const PORT = process.env.PORT || 3000 ;
app.listen( PORT, ()=> console.log(`Backend server is running. Listening on port ${PORT}`));



