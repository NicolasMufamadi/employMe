const express = require('express');
const cors = require('cors');
const http = require('http');

require('dotenv').config();

var app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
const userRoutes = require('./routes/user.routes');
const addressRoutes = require('./routes/address.routes');
const academicRoutes = require('./routes/qualification.routes');

app.use('/user/',userRoutes);
app.use('/address',addressRoutes);
app.use('/qualification',academicRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on https://localhost:${process.env.PORT}`)
    var options = {
        port: '4444',
        host: 'localhost'
    }
    var request = http.request(options);

    request.setHeader('X-Api-Key','json')
});