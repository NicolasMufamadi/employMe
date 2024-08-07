const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan')

const upload = require('./middleware/multer')

require('dotenv').config();

var app = express();

//middleware
app.use(cors({origins: ['http://localhost:3000','https://api.api-ninjas.com']}));
app.use(express.json());
app.use(morgan('dev'))

//routes
const userRoutes = require('./routes/user.routes');
const addressRoutes = require('./routes/address.routes');
const academicRoutes = require('./routes/qualification.routes');
const jobRoutes = require('./routes/job.routes');
const applicatioRoutes = require('./routes/application.Routes');
const companyRoutes = require('./routes/company.routes')
const managerRoutes = require('./routes/manager.routes')

app.use('/user/',userRoutes);
app.use('/address',addressRoutes);
app.use('/qualification',academicRoutes);
app.use('/job',jobRoutes);
app.use('/application',applicatioRoutes)
app.use('/company',upload.single('image'),companyRoutes)
app.use('/manager',managerRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
    var options = {
        port: '4444',
        host: 'localhost'
    }
    var request = http.request(options);

    request.setHeader('X-Api-Key','json')
});