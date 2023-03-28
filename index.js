const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.Routes');


var app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/user/',userRoutes);

app.listen(process.env.PORT,()=> console.log(`Server running on https://localhost:${process.env.PORT}`));