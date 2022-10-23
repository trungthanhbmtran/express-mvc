const express = require('express');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const winston = require('../src/v1/utils/logger')
const compression = require('compression')
const responseTime = require('response-time')
const cors = require('cors')
const createError = require('http-errors')
// const LogEvents = require('./v1/helpers/LogEvents')
const {v4 : uuid} = require('uuid')
//init dbs 
// require('./v1/databases/init.mongodb')
// require('./v1/databases/init.redis')


//user middleware
app.use(helmet())
app.use(morgan('combined',{ stream: winston.stream }))
app.use(responseTime())
// compress responses
app.use(compression())

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin : '*',
    methods : ['*']
}))

//router
app.use('/v1',require('./v1/routes'))


// Error Handling Middleware called

app.use((req, res, next) => {
    next(createError.NotFound('this routes does not exist.'))
});


// error handler middleware
app.use((error, req, res, next) => {
      // add this line to include winston logging
    // winston.info(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    winston.error(`idError : ${uuid()} --- ${req.url} --- ${req.method} --- ${error.message} - ${req.ip} `)
    // LogEvents(`idError : ${uuid()} --- ${req.url} --- ${req.method} --- ${error.message}`)
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

module.exports = app;